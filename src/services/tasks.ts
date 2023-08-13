const baseUrl = "http://localhost:3030/tasks";

export async function createTask(data: any) {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function getTasks() {
  const res = await fetch(baseUrl);
  return res.json();
}

export async function updateTask({ id, data }: { id: string; data: any }) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function deleteTask(id: number) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}

export async function bulkDeleteTasksv1(idsToDelete: string[]) {
  for (const id of idsToDelete) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete task with ID ${id}`);
    }
  }
}


// =========================================================

const categoriesUrl = "http://localhost:3030/categories";

export async function getCategories() {
  const res = await fetch(categoriesUrl);
  return res.json();
}

export async function createCategories(data: any) {
  const response = await fetch(categoriesUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function updateCategoryTask({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  const response = await fetch(`${categoriesUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

// ======================================