import React, { useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Header from "../Header";
import GoBack from "../GoBack";
import DescriptionInput from "../DescriptionInput";
import { routes } from "../../routes";
import { reducer, initialState } from "./reducer";

function ChangeTask() {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchTask() {
      const resp = await fetch(routes.task(id as string));
      if (resp.ok) {
        const task = await resp.json();
        dispatch({ type: "TASKS/FETCHED", payload: task });
      } else {
        dispatch({ type: "ERROR", payload: resp });
      }
    }
    fetchTask();
  }, [id]);

  const navigate = useNavigate();

  async function handleChangeTask(description: string) {
    const resp = await fetch(routes.tasks(), {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify({
        _id: id,
        description,
        active: state.task?.active,
      }),
    });
    if (resp.ok) {
      navigate("/");
    } else {
      dispatch({ type: "ERROR", payload: resp });
    }
  }

  if (state.error) {
    return (
      <Container>
        <Header />
        <Alert variant="danger">{state.error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <GoBack />
      <DescriptionInput
        key={state.task?._id}
        initDescription={state.task?.description}
        handleAddTask={handleChangeTask}
      />
    </Container>
  );
}

export default ChangeTask;
