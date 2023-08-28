import { Slug } from './slug'

it('should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('An Example of a Text!')

  expect(slug.value).toEqual('an-example-of-a-text')
})
