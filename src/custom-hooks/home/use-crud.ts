import { useMutation, useQueryClient } from "react-query";
import {
  bulkDeleteTasksv1,
  createCategories,
  createTask,
  deleteTask,
  updateCategoryTask,
  updateTask,
} from "services/tasks";

const useCrud = () => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries("tasks");
  };
  const addMutation = useMutation(createTask, { onSuccess });
  const updateMutation = useMutation(updateTask, { onSuccess });
  const deleteMutation = useMutation(deleteTask, { onSuccess });
  const bulkDeleteMutation = useMutation(bulkDeleteTasksv1, { onSuccess });
  const addCategoryMutation = useMutation(createCategories, { onSuccess });
  const updateCategoryMutation = useMutation(updateCategoryTask, { onSuccess });
  return {
    addMutation,
    updateMutation,
    deleteMutation,
    bulkDeleteMutation,
    addCategoryMutation,
    updateCategoryMutation,
  };
};

export default useCrud;
