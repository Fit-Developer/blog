import React from "react";

export default function DraftForm({ closeModal }) {
  return (
    <div>
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-1">
          <label className="font-medium">Title</label>
          <input className="border rounded w-full h-[30px] px-3" type="text" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">Content</label>
          <textarea className="border rounded px-3" rows="5"></textarea>
        </div>
        <div className="space-y-3 pt-3">
          <div className="flex justify-between gap-3">
            <button className="w-full bg-sky-500 rounded-lg text-white py-2 font-bold">
              Save
            </button>
            <button
              onClick={closeModal}
              className="w-full border-sky-500 border rounded-lg text-sky-500 py-2 font-bold"
            >
              Cancle
            </button>
          </div>
          <button className="w-full bg-emerald-500 rounded-lg py-2 text-white font-bold">
            Publish Now
          </button>
        </div>
      </form>
    </div>
  );
}
