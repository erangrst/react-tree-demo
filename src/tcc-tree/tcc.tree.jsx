import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Spinner from "../infra/spinner";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

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

  if (error) throw error;
  if (loading) return <Spinner />;
  // if (data.length === 0) return <PageNotFound />;

  return (
    <>
      <h1>TCC Tree</h1>

      <section id="hws">{data.map(renderHw)}</section>

      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="10" label="OSS" />
          <TreeItem nodeId="6" label="MUI">
            <TreeItem nodeId="8" label="index.js" />
          </TreeItem>
        </TreeItem>
      </TreeView>
    </>
  );
}
