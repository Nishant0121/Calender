import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { addEvent } from "../features/events/eventSlice";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Tag, Plus } from "lucide-react";

Modal.setAppElement("#root");

const categories = [
  { label: "Exercise", value: "exercise" },
  { label: "Eating", value: "eating" },
  { label: "Work", value: "work" },
  { label: "Relax", value: "relax" },
  { label: "Family", value: "family" },
  { label: "Social", value: "social" },
];

export default function EventModal({ isOpen, onRequestClose, slot }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("exercise");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (slot) {
      setStart(slot.start);
      setEnd(slot.end);
    }
  }, [slot]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addEvent({
        title,
        category,
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(),
      })
    );
    onRequestClose();
    // reset
    setTitle("");
    setCategory("exercise");
    setStart("");
    setEnd("");
  };

  // Custom styling for modal
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(0px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
    },
    content: {
      position: "relative",
      inset: "auto",
      border: "none",
      background: "transparent",
      overflow: "visible",
      borderRadius: "0",
      padding: "0",
      width: "100%",
      maxWidth: "450px",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      contentLabel="Create Event"
    >
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
              onClick={onRequestClose}
              style={{ zIndex: -1 }}
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 350,
              }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden w-full"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <motion.h2
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl font-medium text-gray-900 flex items-center gap-2"
                >
                  <Plus size={18} className="text-blue-600" />
                  Create New Event
                </motion.h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={onRequestClose}
                  className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <X size={18} />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Tag size={16} className="text-gray-500" />
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                    placeholder="Event title"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Tag size={16} className="text-gray-500" />
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white transition-colors"
                    >
                      {categories.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock size={16} className="text-gray-500" />
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onRequestClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Create Event
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Modal>
  );
}
