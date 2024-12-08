import React, { ChangeEvent, FormEvent, useReducer } from "react";
import type { Form } from "../store/store";
import {useStore } from "../store/store";

type State = {
  label: string;
  inputType: string;
};

type Action = {
  type: "ADD_LABEL" | "ADD_SELECT_VALUE";
  payload: string;
};

const initialState: State = {
  label: "",
  inputType: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_LABEL":
      return { ...state, label: action.payload };
    case "ADD_SELECT_VALUE":
      return { ...state, inputType: action.payload };
    default:
      return state;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { createForm, forms, resetForm, removeForm } = useStore();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value: Form = {
      id: Date.now(),
      label: state.label,
      inputType: state.inputType,
    };

    createForm(value);
    dispatch({type: 'ADD_LABEL', payload: ''});
    dispatch({type: 'ADD_SELECT_VALUE', payload: ''});
  };

  console.log(forms);

  return (
    <div className="mx-auto flex items-center justify-center pt-[4rem]">
      <form
        onSubmit={onSubmit}
        className="bg-white w-[30rem] p-[1rem] rounded-[.5rem] h-[70vh] overflow-y-scroll"
      >
        <h1 className="text-center font-bold">Form Builder</h1>

        <div className="flex flex-col gap-[1rem] mt-[1rem]">
          <input
            type="text"
            name=""
            id=""
            value={state.label}
            placeholder="Enter Label"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "ADD_LABEL", payload: e.target.value })
            }
            className="border w-full p-[.5rem] rounded-[.5rem]"
          />

          <select
            className="select select-bordered w-full"
            value={state.inputType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              dispatch({ type: "ADD_SELECT_VALUE", payload: e.target.value })
            }
          >
            <option value={"text"} selected>
              Text
            </option>
            <option value={"number"}>Number</option>
            <option value={"textarea"}>Textarea</option>
            <option value={"date"}>Date</option>
          </select>
        </div>

        <div className="flex items-center justify-between w-full mt-[1rem]">
          <button type="submit" className="btn">
            Add Field
          </button>
          <button type="button" className="btn btn-danger" onClick={() => resetForm()}>
            Reset Form
          </button>
        </div>

        <div className=" mt-[1rem] flex flex-col gap-[1rem]">
        {forms.length > 0 ? 
        <>
          {forms.map((form) => (
          <div className="border w-full rounded-[.5rem] p-[1rem] flex flex-col gap-[1rem]">
            <label htmlFor="" className="font-semibold">{form.label}</label>
            {form.inputType === "textarea" ? (
              <textarea className="border rounded-[.5rem] outline-none p-[.5rem]"></textarea>
            ) : (
              <input type={form.inputType} name="" id="" className="border w-full outline-none p-[.3rem] rounded-[.5rem]"/>
            )}

            <button type="button" className="btn btn-error !text-white w-[5rem]" onClick={() => removeForm(form.id)}>Remove</button>
          </div>
        ))}
        </> : 
        <>
        </>}
      </div>
      </form>
    </div>
  );
};

export default Form;
