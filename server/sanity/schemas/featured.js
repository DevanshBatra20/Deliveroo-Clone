import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Featured Cateogory Name',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: 'restraunts',
      type: 'array',
      title: 'Restraunts',
      of: [{type: 'reference', to: [{type: 'restraunt'}]}],
    }),
  ],
})
