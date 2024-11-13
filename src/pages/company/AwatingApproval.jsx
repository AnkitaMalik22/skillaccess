export default function AwaitingApproval() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
        <div className="bg-white rounded-lg shadow-md w-full max-w-md overflow-hidden">
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-center">
              Awaiting approval by admin
            </h1>
            <p className="text-accent text-center">
              Your details have been submitted
            </p>
            <p className="text-center text-gray-600">
              Thank you for your submission. We appreciate your patience while we review your details.
            </p>
          </div>
        </div>
      </div>
  
    )
  }