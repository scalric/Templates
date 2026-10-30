import type { Template } from '../../types/template'
import { TemplateCard } from './TemplateCard'

export function TemplateGrid({ templates }: { templates: Template[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {templates.map((t) => <TemplateCard key={t.id} template={t} />)}
    </div>
  )
}
