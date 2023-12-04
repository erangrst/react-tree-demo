import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Spinner from "../infra/spinner";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { TreeView } from "@mui/x-tree-view/TreeView";
// import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import 'primeicons/primeicons.css';

export default function TccTreeComponent() {
  const { data, loading, error } = useFetch("hw");

  function renderHw(hw) {
    return (
      <div key={hw.id}>
        <div>Id: {hw.id}</div>
        <div>Name: {hw.name}</div>
        <div>Status: {hw.status}</div>
        <div>====================================================================</div>
      </div>
    );
  }

  function createTree(hws) {
    console.log("createTree 1", { hws });

    const tmpNodes = hws.map((hwItem) => {
      const node = {
        id: hwItem.id,
        key: hwItem.id,
        label: hwItem.name,
        data: {
          obj: hwItem,
        },
      };

      return node;
    });

    tmpNodes.forEach((nodeItem) => {
      if (nodeItem.data.obj.parentId !== 0) {
        const tmpNode = tmpNodes.find((tmpNodeItem) => tmpNodeItem.data.obj.id == nodeItem.data.obj.parentId);

        if (tmpNode) {
          console.log("createTree 2 -a ", { tmpNode, children: tmpNode.children });

          tmpNode.children = [...(tmpNode.children || []), nodeItem];
          console.log("createTree 2 -b ", { tmpNode });
        }
      }
    });

    const rootNodes = tmpNodes.filter((node) => node.data.obj.parentId === "0");
    console.log("createTree 3", { rootNodes });

    return rootNodes;
  }

  const actionTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button type="button" icon="pi pi-search" rounded></Button>
        <Button type="button" icon="pi pi-pencil" severity="success" rounded></Button>
      </div>
    );
  };

  if (error) throw error;
  if (loading) return <Spinner />;
  // if (data.length === 0) return <PageNotFound />;

  console.log("TccTreeComponent 1", { data, loading, error });

  const nodes = createTree(data);

  console.log("after createTree", { nodes });

  return (
    <>
      <h1>TCC Tree</h1>

      <section id="hws">{data.map(renderHw)}</section>

      <TreeTable value={nodes} tableStyle={{ minWidth: "50rem" }}>
        <Column field="obj.name" header="Name" expander></Column>
        <Column field="obj.status" header="Status"></Column>
        <Column body={actionTemplate} headerClassName="w-10rem" />
      </TreeTable>
    </>
  );
}
