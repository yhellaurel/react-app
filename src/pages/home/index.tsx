import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  Dropdown,
  Field,
  Form,
  Table,
  Toggle,
  TextArea,
  SearchField,
} from "components";
import {
  CategoriesObject,
  Operation,
  SelectedDataObject,
  TableItemActions,
} from "index";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "react-query";
import { getCategories, getTasks } from "services/tasks";
import { columnsType } from "pages/types-interfaces/home.d";
import useCrud from "custom-hooks/home/use-crud";

export const SelectedDataObjectInitVal: SelectedDataObject = {
  active: false,
  category: "",
  description: "",
  id: "",
  name: "",
}

export default function Home() {
  const crud = useCrud();
  const formRef = useRef<HTMLFormElement>(null);
  const categoryFormRef = useRef<HTMLFormElement>(null);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showDialogCategory, setshowDialogCategory] = useState<boolean>(false);
  const [filterActive, setFilterActive] = useState<string>("");
  const [filterName, setFilterName] = useState<string>("");
  const [selectedData, setSelectedData] = useState<SelectedDataObject>(SelectedDataObjectInitVal);
  const [dataSource, setDataSource] = useState<SelectedDataObject[]>([]);
  const [categorySource, setCategorySource] = useState<CategoriesObject[]>([]);
  const [bulkDeleteId, setBulkDeleteId] = useState<string[]>([]);
  
  useEffect(() => {
    setDataSource((prevDataSource: SelectedDataObject[]) => {
      return prevDataSource.filter((item) => {
        if (filterActive === "all" && item.name.includes(filterName)) {
          return { ...item };
        }
        if (
          `${item.active}` === filterActive &&
          item.name.includes(filterName)
        ) {
          return { ...item };
        }
      });
    });
    return () => {
      setDataSource(data ?? []);
    };
  }, [filterActive, filterName]);

  const ToggleFunction = (newValue: boolean) => {
    setSelectedData((prevState: SelectedDataObject) => {
      return { ...prevState, active: newValue };
    });

    // Updating the table real-time
    setDataSource((prevDataSource: SelectedDataObject[]) => {
      return prevDataSource.map((item) => {
        if (item.id === selectedData.id) {
          return { ...item, active: newValue };
        }
        return item;
      });
    });
  };

  // Using the hook
  const { data } = useQuery("tasks", getTasks);
  const { data: categoryData } = useQuery("categories", getCategories);

  const handleBulkDelete = (values: any[]) => {
      crud.bulkDeleteMutation.mutate(values)
      setBulkDeleteId((prevState) => prevState.filter(id => id !== id));
  };

  const operations: Operation[] = [
    {
      render: () => (
        <Button
          className="w-30 h-45 shrink bg-blue-100 mb-4 text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-100 hover:border-transparent rounded"
          onClick={() => {
            setShowDialog(true);
            setIsAdd(true);
          }}
        >
          Add Task
        </Button>
      ),
    },
    {
      render: () => (
        <Button
          className="w-30 h-45 shrink bg-blue-100 mb-4 text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-100 hover:border-transparent rounded"
          onClick={() => {
            setshowDialogCategory(true);
            setIsAdd(true);
          }}
        >
          Create Category
        </Button>
      ),
    },
    {
      render: () => (
        <Button
          className="w-30 h-45 shrink bg-red-100 mb-4 text-sm hover:bg-red-500 text-red-700 font-semibold hover:text-white py-0 px-2 border border-red-100 hover:border-transparent rounded"
          onClick={() => {
            handleBulkDelete(bulkDeleteId);
          }}
        >
          Bulk Delete
        </Button>
      ),
    },
    {
      render: () => (
        <Dropdown
          setState={setFilterActive}
          label="Filter"
          name="filter"
          options={["all", "true", "false"]}
        />
      ),
    },
    {
      render: () => (
        <SearchField
          setState={setFilterName}
          label=""
          name="name"
          placeholder="  Search name"
        />
      ),
    },
  ];

  const handleEdit = (values: SelectedDataObject) => () => {
    setIsAdd(false);
    setShowDialog(true);
    setSelectedData(values);
  };

  const handleDelete = (values: any) => () => {
    setDataSource(dataSource.filter((item) => item.name !== values.name));
    crud.deleteMutation.mutate(values.id);
  };
  const handleSubmit = (values: SelectedDataObject) => {
    setDataSource((prevState: SelectedDataObject[]) => {
      const newDataSource = prevState;
      if (isAdd) {
        const newData: SelectedDataObject = {
          ...values,
          id: uuidv4(),
          active: !!values.active,
        };
        newDataSource.push(newData);
        crud.addMutation.mutate(newData);
      } else {
        const index = newDataSource.findIndex(
          (entry) => entry.id === values.id
        );
        newDataSource[index] = {
          ...values,
          active: !!values.active,
        };
        crud.updateMutation.mutate({
          id: values.id,
          data: { ...values, active: !!values.active },
        });
      }
      return newDataSource;
    });

    setShowDialog(false);
  };
  const handleSubmitCategory = (values: CategoriesObject) => {
    setCategorySource((prevState: CategoriesObject[]) => {
      const newCategorySource = prevState;
      if (isAdd) {
        const newData: CategoriesObject = {
          ...values,
          id: uuidv4(),
        };
        newCategorySource.push(newData);
        crud.addCategoryMutation.mutate(newData);
      } else {
        const index = newCategorySource.findIndex(
          (entry) => entry.id === values.id
        );
        newCategorySource[index] = {
          ...values,
        };
        crud.updateCategoryMutation.mutate({
          id: values.id,
          data: { ...values },
        });
      }
      return newCategorySource;
    });

    setshowDialogCategory(false);
  };

  const actions: TableItemActions[] = [
    {
      render: (values: SelectedDataObject) => (
        <Button className="mr-4 text-blue-500" onClick={handleEdit(values)}>
          Edit
        </Button>
      ),
    },
    {
      render: (values: SelectedDataObject) => (
        <Button className="text-red-500" onClick={handleDelete(values)}>
          Delete
        </Button>
      ),
    },
  ];

  // Pre filling based on the current selected data
  useEffect(() => {
    if (showDialog && !isAdd) {
      Object.keys(selectedData).forEach((key, index) => {
        if (formRef.current && formRef.current[key]) {
          if (formRef.current[key].type === "checkbox") {
            formRef.current[key].checked = Object.values(selectedData)[index];
          } else {
            formRef.current[key].value = Object.values(selectedData)[index];
          }
        }
      });
    }
  }, [showDialog, isAdd, formRef]);

  // updating the backend
  useEffect(() => {
    setDataSource(data ?? []);
    setCategorySource(categoryData ?? []);
  }, [data, categoryData]);

  return (
    <>
      <div>
        <Table
          setState={setBulkDeleteId}
          columns={columnsType}
          dataSource={dataSource}
          operations={operations}
          actions={actions} // http methods
        />
      </div>
      <Dialog
        title={`${isAdd ? "Add" : "Edit"} Task`}
        show={showDialog}
        onClose={() => setShowDialog(false)}
        // className="block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] light:bg-neutral-700"
      >
        <Form formRef={formRef} onSubmit={handleSubmit}>
          <Field label="Id" name="id" readonly />
          <Field label="Name" name="name" />
          <TextArea label="Description" name="description" />
          <Dropdown
            label="Category"
            options={categorySource.map((item) => item.name)}
            name="category"
          />
          <Toggle
            label="Active"
            checked={selectedData.active}
            onChange={(newValue) => ToggleFunction(newValue)}
            name="active"
          />
          <Button
            type="submit"
            className="w-full px-6 py-2 shrink bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            Submit
          </Button>
        </Form>
      </Dialog>
      <Dialog
        title={`${isAdd ? "Add" : "Edit"} Category`}
        show={showDialogCategory}
        onClose={() => setshowDialogCategory(false)}
      >
        <Form formRef={categoryFormRef} onSubmit={handleSubmitCategory}>
          <Field label="Id" name="id" readonly />
          <Field label="Category Name" name="name" />
          <Button
            type="submit"
            className="w-full px-6 py-2 shrink bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            Create
          </Button>
        </Form>
      </Dialog>
    </>
  );
}
