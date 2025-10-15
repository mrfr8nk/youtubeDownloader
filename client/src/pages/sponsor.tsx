import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Mail, MessageCircle, Send, Heart, Coffee } from "lucide-react";
import { SiWhatsapp, SiTelegram, SiGithub } from "react-icons/si";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "wouter";

export default function Sponsor() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "darrelmucheri@gmail.com",
      href: "mailto:darrelmucheri@gmail.com",
      color: "text-chart-1",
    },
    {
      icon: SiWhatsapp,
      label: "WhatsApp",
      value: "+263 719 647 303",
      href: "https://wa.me/263719647303",
      color: "text-chart-2",
    },
    {
      icon: SiTelegram,
      label: "Telegram",
      value: "@mrfrankofc",
      href: "https://t.me/mrfrankofc",
      color: "text-chart-3",
    },
    {
      icon: SiGithub,
      label: "GitHub",
      value: "mrfr8nk",
      href: "https://github.com/mrfr8nk",
      color: "text-foreground",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" data-testid="button-back-home">
              ← Back to Downloader
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Support Development</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent">
              Meet the Developer
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hi, I'm Darrell Mucheri, the creator of this YouTube downloader. If you find this tool useful, consider supporting its development!
            </p>
          </div>

          {/* Developer Card */}
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary via-chart-3 to-chart-2"></div>
            <CardContent className="pt-0 -mt-16">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-chart-3 p-1 mb-4">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-4xl font-bold">
                    DM
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-2">Darrell Mucheri</h2>
                <p className="text-muted-foreground mb-6">Full Stack Developer | Open Source Enthusiast</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      data-testid={`link-${method.label.toLowerCase()}`}
                    >
                      <Card className="hover-elevate active-elevate-2 transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg bg-card-border ${method.color}`}>
                              <method.icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-muted-foreground">{method.label}</p>
                              <p className="font-medium truncate">{method.value}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-chart-1" />
                  Buy Me a Coffee
                </CardTitle>
                <CardDescription>
                  Support ongoing development and maintenance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Your donations help keep this tool free and continuously improved with new features and bug fixes.
                </p>
                <Button className="w-full" variant="default" data-testid="button-donate">
                  <Heart className="mr-2 h-4 w-4" />
                  Donate via PayPal
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  Star on GitHub
                </CardTitle>
                <CardDescription>
                  Show your support by starring the repository
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Give the project a star on GitHub to help others discover this tool and contribute to its growth.
                </p>
                <Button className="w-full" variant="outline" asChild data-testid="button-github">
                  <a href="https://github.com/mrfr8nk" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Visit GitHub Profile
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Note */}
          <Card className="bg-gradient-to-r from-primary/10 via-chart-3/10 to-chart-2/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Thank You for Using This Tool!</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This YouTube downloader is built with care and maintained regularly. Your feedback and support make it possible to keep improving and adding new features. Feel free to reach out with suggestions or issues!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Made with <Heart className="inline h-4 w-4 text-primary" /> by Darrell Mucheri
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
