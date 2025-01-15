import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/joy";

export const CreateSubForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    nsfw: false,
    tag: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    close();
  };

  return (
    <>
      <Typography id="form-modal-title" level="h4" textAlign="center">
        Create a sub
      </Typography>
      <Typography id="form-modal-description" textAlign="center" mb={2}>
        Fill the fields below to grow a community
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Sub name</FormLabel>
            <Input
              name="name"
              placeholder="The name of your sub"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              name="desc"
              placeholder="Describe your sub in a few words"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>NSFW</FormLabel>
            <RadioGroup
              name="isNsfw"
              value={formData.nsfw}
              onChange={handleChange}
            >
              <Stack direction="row">
                <Radio value="true">yes</Radio>
                <Radio value="false">no</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Tag</FormLabel>
            <Input
              name="tag"
              placeholder="Enter a tag for your sub"
              value={formData.tag}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Stack direction="row" justifyContent="space-between">
            <Button type="submit">Soumettre</Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};
