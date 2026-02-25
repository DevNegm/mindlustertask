export const getTotalTasks = (columns) => {
   return columns?.reduce((total, column) => total + column?.tasks?.length, 0)
};

export const modalStyles = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '90%',
   maxWidth: 600,
   bgcolor: 'background.paper',
   borderRadius: '15px',
   boxShadow: 24,
   p: 6
};

export const getPriorityColors = (priority) => {
   switch (priority) {
      case "HIGH":
         return {
            bg: "#fee2e2",
            color: "#b91c1c",
         };
      case "MID":
         return {
            bg: "#fef3c7",
            color: "#b45309",
         };
      case "LOW":
         return {
            bg: "#dcfce7",
            color: "#15803d",
         };
      default:
         return {
            bg: "#dcfce7",
            color: "#15803d",
         };
   }
};