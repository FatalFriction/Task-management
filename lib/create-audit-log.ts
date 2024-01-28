import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { pusherServer } from "./pusher-server";
import { redis } from "./redis";

interface Props {
  entityId: string,
  entityType: ENTITY_TYPE,
  entityTitle: string,
  action: ACTION,
  entityStatus?: string,
  imageTitle?: string,
  ListTitle: string,
};

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId,userId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found!");
    }

    const { entityId, entityType, entityTitle, ListTitle, action } = props;
    let { entityStatus, imageTitle } = props;
    
    if(!entityStatus){
      entityStatus = ""
    }

    if(!imageTitle){
      imageTitle = ""
    }

    let newAction
    
    switch (action) {
      case "CREATE":
        newAction = "Created"
        break;
        case "UPDATE":
          newAction = "Updated"
          break;
          case "DELETE":
            newAction = "Deleted"
            break;
            case "UPLOAD":
              newAction = "Uploaded"
              break;
              default:
                console.log("Unknown action");
              }
              
              const currentTime = new Date();

              try {
                await redis.sadd( orgId,"( " + entityStatus + " )" + " - " + entityTitle + " " + entityType + " has been " + newAction + " by " + user?.firstName + " " + user?.lastName )
                await redis.pexpire(orgId, 24 * 60 * 60 * 1000)

                try {
                  await pusherServer.trigger("messages","notifications",{
                    user: userId,
                    data : `( ${entityStatus} | ${ListTitle} ) - ${entityTitle} | ${imageTitle} ${entityType} has been ${newAction} by ${user?.firstName} ${user?.lastName}`,
                    createdAt: currentTime,
                    entityStatus: entityStatus
                  })
                } catch (error) {
                  
                }

              } catch (error) {
                console.error(error)
              }

              
              await db.auditLog.create({
                data: {
                  orgId,
                  entityId,
                  entityType,
                  entityTitle,
                  entityStatus,
                  action,
                  userId: user.id,
                  userImage: user?.imageUrl,
                  userName: user?.firstName + " " + user?.lastName,
                }
              });
              
            } catch (error) {
              console.log("[AUDIT_LOG_ERROR]", error);
            }
          }