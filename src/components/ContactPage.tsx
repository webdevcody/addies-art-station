export function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -m-6 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-3xl shadow-xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">💌</span>
                <h1 className="text-4xl font-bold">Contact Me</h1>
              </div>
              <p className="text-purple-100 text-xl max-w-2xl">
                I'd love to hear from you! Whether you have questions about my
                artwork, want to discuss a custom piece, or just want to say
                hello.
              </p>
            </div>
            <div className="text-6xl opacity-80">✨</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <span className="text-3xl">📞</span>
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl text-white">💌</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg">
                      Email Me
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      The best way to reach me is through email. I typically
                      respond within 24-48 hours.
                    </p>
                    <a
                      href="mailto:addie@artstation.com"
                      className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors group"
                    >
                      <span className="group-hover:scale-110 transition-transform">
                        📧
                      </span>
                      addie@artstation.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl text-white">🎨</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg">
                      Custom Commissions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Interested in a custom piece? I'd love to work with you to
                      create something unique. Please include details about
                      size, style preferences, and timeline in your message.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl text-white">🤝</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg">
                      Collaborations
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Open to collaborating with other artists, galleries, or
                      businesses. Let's discuss how we can work together!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Contact Me */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg border border-purple-200 dark:border-purple-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <span className="text-3xl">❓</span>
              Why Reach Out?
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 group">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-125 transition-transform"></div>
                <p className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Questions about existing artwork or prints
                </p>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full group-hover:scale-125 transition-transform"></div>
                <p className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Custom commission inquiries
                </p>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-125 transition-transform"></div>
                <p className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Collaboration opportunities
                </p>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full group-hover:scale-125 transition-transform"></div>
                <p className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Gallery or exhibition partnerships
                </p>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-125 transition-transform"></div>
                <p className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Press or interview requests
                </p>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full group-hover:scale-125 transition-transform"></div>
                <p className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Just want to say hello and share your thoughts!
                </p>
              </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">💭</div>
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                  "I believe art is meant to be shared and discussed. Every
                  message I receive brings me joy and helps me grow as an
                  artist. Don't hesitate to reach out!"
                </p>
                <p className="text-purple-600 dark:text-purple-400 font-semibold mt-3">
                  - Addie ✨
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Information */}
        <div className="mt-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-5xl mb-4">⏰</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Response Times
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  General Inquiries
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  24-48 hours
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Commission Requests
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  1-3 days
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Business Partnerships
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  3-5 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
