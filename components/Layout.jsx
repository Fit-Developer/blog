import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import { Inter } from "next/font/google";

import { ArchiveBoxIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";

import Modal from "./Modal";
import DraftForm from "./DraftForm";
import ShowPostCount from "./ShowPostCount";
import SearchBar from "./SearchBar";
import Loading from "./Loading";

import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  const [createModal, setCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pageActiveStyle = (path) => {
    return path === router.pathname
      ? {
          borderBottom: "2px solid",
          color: "rgb(14 165 233)",
        }
      : {};
  };

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <div
        className={`container max-h-screen overflow-hidden ${inter.className}`}
      >
        <div className="flex justify-center md:justify-start pt-[30px]">
          <button
            onClick={() => setCreateModal(true)}
            className="text-white p-3 rounded-lg font-bold bg-sky-500 flex items-center gap-2"
          >
            <DocumentPlusIcon className="w-5" />
            <span>Create Draft</span>
          </button>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between md:items-end md:h-[60px] gap-y-3 pt-3 md:pt-0">
          <div className="flex items-center gap-6 justify-center md:justify-start">
            <Link href="/">
              <button
                style={pageActiveStyle("/")}
                className="flex items-center gap-1 font-bold"
              >
                <DocumentTextIcon className="w-5" />
                <span>Post</span>
              </button>
            </Link>
            <Link href="/draft">
              <button
                style={pageActiveStyle("/draft")}
                className="flex items-center gap-1 font-bold"
              >
                <ArchiveBoxIcon className="w-5" />
                <span>Draft</span>
              </button>
            </Link>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <SearchBar />
            <ShowPostCount />
          </div>
        </div>

        <div className="mt-[30px] h-[calc(100vh-150px)] overflow-scroll pb-[30px]">
          {loading ? <Loading /> : children}
        </div>
      </div>
      <Modal isOpen={createModal} setIsOpen={setCreateModal} title="New Post">
        <DraftForm closeModal={() => setCreateModal(false)} />
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
