export default function VerifyPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-sm text-center space-y-4">

        <h1 className="text-2xl font-bold">
          Cek Email Kamu 📩
        </h1>

        <p className="text-gray-600 text-sm">
          Kami sudah mengirim link verifikasi ke email kamu.
          Silakan buka email dan klik link tersebut untuk
          mengaktifkan akun.
        </p>

        <a
          href="/login"
          className="block text-blue-600"
        >
          Sudah verifikasi? Login
        </a>

      </div>
    </div>
  )
}