/**
 * Types for the Experiments collection
 */
export interface ExperimentItem {
  _id?: string
  path?: string
  title?: string
  slug?: string
  date: string
  description?: string
  author?: string
  thumbnail?: string
  tags?: string[]
}

/**
 * Types for the Authors collection
 */
export interface AuthorItem {
  _id?: string
  path?: string
  slug: string
  name: string
  avatar: string
  bio?: string
} 