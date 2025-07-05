import { useCustomTranslate } from '@/i18n'
import { Link, useLocation, useMatches } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'

export const BreadCrumbs = () => {
  const { t } = useCustomTranslate()
  const matches = useMatches()
  const location = useLocation()

  const hiddenPaths = ['/', '/home']

  if (hiddenPaths.includes(location.pathname)) {
    return null
  }

  const crumbs = matches
    .filter((match) => match.handle?.crumb)
    .map((match) => ({
      label: match.handle.crumb(match),
      path: match.pathname
    }))

  return (
    <Breadcrumb className="py-4 max-md:ml-4 lg:ml-4">
      <BreadcrumbList>
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1
          const label = t(`breadCrumb:${item.label}`)
          return isLast ? (
            <BreadcrumbItem key={item.path}>
              <BreadcrumbPage className="text-muted-foreground text-sm">{label}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <div key={item.path} className="flex items-center gap-2">
              <BreadcrumbItem>
                <Link className="link text-sm" to={item.path}>
                  {label}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
