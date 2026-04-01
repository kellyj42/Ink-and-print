import { defineField, defineType } from "sanity";

const categoryOptions = [
  { title: "Apparel", value: "Apparel" },
  { title: "Streetwear", value: "Streetwear" },
  { title: "Accessories", value: "Accessories" },
  { title: "Business", value: "Business" },
  { title: "Uniforms", value: "Uniforms" },
  { title: "Promotional", value: "Promotional" },
];

const colorOptions = [
  { title: "White", value: "White" },
  { title: "Black", value: "Black" },
  { title: "Navy", value: "Navy" },
  { title: "Red", value: "Red" },
  { title: "Charcoal", value: "Charcoal" },
  { title: "Cream", value: "Cream" },
  { title: "Olive", value: "Olive" },
  { title: "Burgundy", value: "Burgundy" },
  { title: "Grey", value: "Grey" },
  { title: "Sky", value: "Sky" },
  { title: "Royal Blue", value: "Royal Blue" },
  { title: "Green", value: "Green" },
  { title: "Yellow", value: "Yellow" },
  { title: "Orange", value: "Orange" },
  { title: "Purple", value: "Purple" },
];

const sizeOptions = [
  { title: "XS", value: "XS" },
  { title: "S", value: "S" },
  { title: "M", value: "M" },
  { title: "L", value: "L" },
  { title: "XL", value: "XL" },
  { title: "XXL", value: "XXL" },
  { title: "3XL", value: "3XL" },
  { title: "One Size", value: "One Size" },
];

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: categoryOptions,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (UGX)",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price (UGX)",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      initialValue: 4.5,
      validation: (rule) => rule.min(0).max(5),
    }),
    defineField({
      name: "reviews",
      title: "Review Count",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: colorOptions,
      },
      description: "Select one or more available colors.",
    }),
    defineField({
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: sizeOptions,
      },
      description: "Select the available size range for this product.",
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      description: "Example: Most Popular, New Drop, Team Favorite",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
});
