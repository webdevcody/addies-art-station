export function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Contact Me
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          I'd love to hear from you! Whether you have questions about my
          artwork, want to discuss a custom piece, or just want to say hello.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Get in Touch
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💌</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Email Me
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  The best way to reach me is through email. I typically respond
                  within 24-48 hours.
                </p>
                <a
                  href="mailto:addie@artstation.com"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                >
                  addie@artstation.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎨</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Custom Commissions
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Interested in a custom piece? I'd love to work with you to
                  create something unique. Please include details about size,
                  style preferences, and timeline in your message.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🤝</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Collaborations
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Open to collaborating with other artists, galleries, or
                  businesses. Let's discuss how we can work together!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Contact Me */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Why Reach Out?
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300">
                Questions about existing artwork or prints
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-pink-500 dark:bg-pink-400 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300">
                Custom commission inquiries
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300">
                Collaboration opportunities
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-pink-500 dark:bg-pink-400 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300">
                Gallery or exhibition partnerships
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300">
                Press or interview requests
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-pink-500 dark:bg-pink-400 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300">
                Just want to say hello and share your thoughts!
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/50 dark:bg-gray-900/30 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">
              "I believe art is meant to be shared and discussed. Every message
              I receive brings me joy and helps me grow as an artist. Don't
              hesitate to reach out!"
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              - Addie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
