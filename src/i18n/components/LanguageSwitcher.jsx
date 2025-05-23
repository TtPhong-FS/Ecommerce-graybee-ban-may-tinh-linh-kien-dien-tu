import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import i18n from '../i18n'

export function LanguageSwitcher() {
  const currentLang = localStorage.getItem('language') || 'vi'

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <Select defaultValue={currentLang} onValueChange={(value) => handleChangeLanguage(value)}>
      <SelectTrigger className="text-secondary-foreground ">
        <SelectValue placeholder="Ngôn ngữ" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectItem value="en">En</SelectItem>
          <SelectItem value="vi">Vi</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
