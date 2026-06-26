import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { eventsData } from '@/lib/data/events'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.shreenarayan.edu.np'

  // Fetch dynamic routes
  const faculties = await prisma.faculty.findMany()
  const notices = await prisma.notice.findMany()

  // Generate sitemap entries for dynamic routes
  const facultyEntries: MetadataRoute.Sitemap = faculties.map((faculty) => ({
    url: `${baseUrl}/faculty/${faculty.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const eventEntries: MetadataRoute.Sitemap = eventsData.map((event) => ({
    url: `${baseUrl}/events/${event.id}`,
    lastModified: new Date(event.date),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const noticeEntries: MetadataRoute.Sitemap = notices.map((notice) => ({
    url: `${baseUrl}/notices/${notice.id}`,
    lastModified: new Date(notice.createdAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/academics`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faculty`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/facilities`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  return [...staticRoutes, ...facultyEntries, ...eventEntries, ...noticeEntries]
}
