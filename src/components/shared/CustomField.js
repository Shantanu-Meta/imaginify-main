import React from "react";
import { Control } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";


// Assuming formSchema is already defined in TransformationForm.js
import { formSchema } from "./TransformationForm";

const CustomField = ({control,render,name,formLabel,className}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}

          <FormControl>{render({ field })}</FormControl>
          
          <FormMessage />
        </FormItem>
      )}
    />
    
  );
};

export default CustomField;


