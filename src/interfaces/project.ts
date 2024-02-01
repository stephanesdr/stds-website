export default interface Project {
  id: number;
  name: string;
  image?: {
    url: string
  }
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}