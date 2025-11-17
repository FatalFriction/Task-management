import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust path if needed

export async function GET() {
  try {
    // 1️⃣ Check which database is connected
    const dbInfo = await db.$queryRaw`SELECT DATABASE() AS database_name`;

    // 2️⃣ Check MySQL version (PlanetScale ≠ Hostinger)
    const versionInfo = await db.$queryRaw`SELECT VERSION() AS mysql_version`;

    // 3️⃣ Check server hostname (Hostinger shows srvxxxx or IP)
    const hostInfo = await db.$queryRaw`SELECT @@hostname AS server_hostname`;

    // 4️⃣ Try fetching sample records (Board table example)
    let boards: any[] = [];
    try {
      boards = await db.board.findMany({ take: 3 });
    } catch (err) {
      boards = [{ error: "Board table not found or empty" }];
    }

    // 5️⃣ Insert + delete a test row to confirm write access
    let writeTest: any = "Skipped";
    try {
      const temp = await db.$executeRaw`
        INSERT INTO TestConnection (message) VALUES ("hostinger-test")
      `;
      const cleanup = await db.$executeRaw`
        DELETE FROM TestConnection WHERE message = "hostinger-test"
      `;
      writeTest = "Write OK (Inserted & deleted test row)";
    } catch (err) {
      writeTest = "Write FAILED (table TestConnection not found — optional)";
    }

    // 6️⃣ Show active DATABASE_URL
    const activeDbUrl = process.env.DATABASE_URL;

    // 7️⃣ DB server time
    const timeInfo = await db.$queryRaw`SELECT NOW() AS server_time`;

    return NextResponse.json({
      status: "OK",
      message: "Successfully connected to Hostinger database",
      results: {
        connected_database: dbInfo,
        mysql_version: versionInfo,
        server_hostname: hostInfo,
        sample_boards: boards,
        write_test: writeTest,
        active_env_database_url: activeDbUrl,
        server_time: timeInfo,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "ERROR",
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
