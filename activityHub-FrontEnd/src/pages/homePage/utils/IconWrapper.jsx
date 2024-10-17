import React, { forwardRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// Wrapping FaEdit and FaTrash with forwardRef to support refs
export const EditIcon = forwardRef(({ onClick, className }, ref) => (
  <FaEdit ref={ref} onClick={onClick} className={className} />
));

export const DeleteIcon = forwardRef(({ onClick, className }, ref) => (
  <FaTrash ref={ref} onClick={onClick} className={className} />
));
