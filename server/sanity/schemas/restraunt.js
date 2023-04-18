import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restraunt',
  title: '',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Restraunt Name',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: 'image',
      type: 'image',
      title: 'Image of the restraunt',
    }),

    defineField({
      name: 'lat',
      type: 'number',
      title: 'Latitude of the Restraunt',
    }),

    defineField({
      name: 'long',
      type: 'number',
      title: 'Longitude of the Restraunt',
    }),

    defineField({
      name: 'address',
      type: 'string',
      title: 'Address of the Restraunt',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'rating',
      type: 'number',
      title: 'Enter a rating between 1 and 5',
      validation: (Rule) => Rule.required().min(1).max(5).error('Rating must be between 1 and 5'),
    }),

    defineField({
      name: 'type',
      title: 'Category',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [{type: 'category'}],
    }),

    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    }),
  ],
})
