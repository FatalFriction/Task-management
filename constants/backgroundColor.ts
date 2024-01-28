export const getBackgroundColor = (status: string): string => {
    switch (status) {
      case 'DRAFT':
        return 'bg-[#ca8a04]';
      case 'PENDING':
        return 'bg-[#fde047]';
        case 'INREVIEW':
        return 'bg-blue-400';
      case 'COMPLETE':
        return 'bg-[#90ee90]';
      case 'CANCELLED':
        return 'bg-[#f08080]';
      default:
        return 'white'; // Default color if status doesn't match any case
    }
  };