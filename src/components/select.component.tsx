import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

// Define the option type for Select
interface Option {
  value: string;
  label: string;
}

// Define form values interface
interface FormValues {
  rule: Option | null;
}

interface CustomSelectProps {
  title: string;
  options: Option[];
  placeHolder: string;
  rule: string;
  onFormSubmit: (data: FormValues) => void;
}

// Use forwardRef to pass ref from the parent component
const CustomSelect = forwardRef(
  ({ title, options, placeHolder, rule , onFormSubmit }: CustomSelectProps, ref) => {
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<FormValues>({
      defaultValues: {
        rule: null,
      },
    });

    const customStyles = {
      control: (base: any) => ({
        ...base,
        borderColor: errors.rule ? "red" : base.borderColor,
        boxShadow: errors.rule ? "0 0 0 1px red" : base.boxShadow,
        "&:hover": {
          borderColor: errors.rule ? "red" : "blue",
        },
      }),
    };

    const onSubmit = (data: FormValues) => {
      onFormSubmit(data);
    };

    // Expose handleSubmit to parent component through ref
    useImperativeHandle(ref, () => ({
      submitForm() {
        handleSubmit(onSubmit)(); // Trigger form submit
      },
    }));

    return (
      <form>
        <FormControl isInvalid={!!errors.rule} mb={4}>
          <FormLabel>{title}</FormLabel>
          <Controller
            name="rule"
            control={control}
            rules={{ required: rule }}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                isClearable
                placeholder={placeHolder}
                styles={customStyles}
              />
            )}
          />
          {errors.rule && (
            <FormErrorMessage>{errors.rule.message}</FormErrorMessage>
          )}
        </FormControl>
      </form>
    );
  }
);

export default CustomSelect;
