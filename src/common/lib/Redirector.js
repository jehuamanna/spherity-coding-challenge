import React, { createContext, useContext, useEffect, useState } from "react";

export const ComponentsDataContext = createContext();

export const useComponentDataReceive = (id) => {
  const componentDataObserver = useContext(ComponentsDataContext);
  const [otherState, setOtherState] = useState(null);

  useEffect(() => {
    setOtherState(componentDataObserver.receive(id));
  });

  return otherState;
};

export const useComponentDataSend = (id, data) => {
  const componentDataObserver = useContext(ComponentsDataContext);

  useEffect(() => {
    componentDataObserver.send({ id, data });
  }, [id, data, componentDataObserver]);
};

let listeners = new Map();
const redirector = {
  receive: (id) => {
    return listeners.get(id);
  },
  send: (o) => {
    listeners.set(o.id, o.data);
  },
};
export default function Redirector(props) {
  return (
    <ComponentsDataContext.Provider value={redirector}>
      {props.children}
    </ComponentsDataContext.Provider>
  );
}
