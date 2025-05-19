export const Footer = () => {
  return (
    <div className="flex items-center justify-center px-6">
      <div className="flex h-[2.8rem] w-full max-w-[88rem] mx-auto gap-2 items-center">
        <p className="text-primary text-sm">&copy; {new Date().getFullYear()} copyright PhongTt. All right reserved.</p>
      </div>
    </div>
  )
}
