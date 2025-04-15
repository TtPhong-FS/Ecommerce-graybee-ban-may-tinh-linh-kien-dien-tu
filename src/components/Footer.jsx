const Footer = () => {
  return (
    <div className="flex items-center justify-center px-6">
      <div className="flex h-[2.8rem] container mx-auto gap-2 items-center">
        <p className="text-gray-100">&copy; {new Date().getFullYear()} copyright PhongTt. All right reserved.</p>
      </div>
    </div>
  )
}

export default Footer
