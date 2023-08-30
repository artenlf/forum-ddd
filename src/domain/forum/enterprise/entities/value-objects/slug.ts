export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * This value-object receives a String and format it as a slug
   * through Normalize method.
   *
   * The normalize() method of String values
   * returns the Unicode Normalization Form of this string.
   *
   * Example: "Hello, World!" ==> "hello-world"
   *
   * @param text {string}
   */

  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
