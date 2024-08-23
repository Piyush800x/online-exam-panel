import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Hero() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Secure and Reliable Online Exams
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Streamline your exam administration with our powerful online platform. Ensure the integrity of your
                    exams and provide a seamless experience for your candidates.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <RegisterLink
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Sign Up
                  </RegisterLink>
                </div>
              </div>
              <div>
                <Image
                    src={"/hero.webp"}
                    width={550}
                    height={550}
                    alt="Hero"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Exam Process</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our online exam platform offers a comprehensive suite of features to simplify your exam
                  administration, ensure security, and provide detailed insights.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Secure Exam Administration</h3>
                      <p className="text-muted-foreground">
                        Protect the integrity of your exams with advanced security features, including identity
                        verification, browser lockdown, and live proctoring.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Flexible Scheduling</h3>
                      <p className="text-muted-foreground">
                        Easily schedule exams at your convenience, with options for on-demand, timed, and self-paced
                        assessments.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Detailed Reporting</h3>
                      <p className="text-muted-foreground">
                        Generate comprehensive reports to track candidate performance, identify areas for improvement,
                        and make data-driven decisions.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                src="/hero2.png"
                width={550}
                height={310}
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from the people who trust us to deliver secure and reliable online exams.
              </p>
            </div>
            <div className="divide-y rounded-lg border">
              <div className="grid w-full grid-cols-1 items-stretch justify-center divide-x md:grid-cols-2 lg:grid-cols-3">
                <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 p-4 sm:p-8">
                  <img
                    src="https://avatar.iran.liara.run/public"
                    width="64"
                    height="64"
                    alt="Avatar"
                    className="rounded-full"
                    style={{ aspectRatio: "64/64", objectFit: "cover" }}
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold">Jane Doe</div>
                    <div className="text-muted-foreground">University of Excellence</div>
                  </div>
                  <p className="text-muted-foreground">
                    "The Exam Panel platform has been a game-changer for our\n university. The security features and
                    detailed reporting\n have helped us maintain the integrity of our exams."
                  </p>
                </div>
                <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 p-4 sm:p-8">
                  <img
                    src="https://avatar.iran.liara.run/public"
                    width="64"
                    height="64"
                    alt="Avatar"
                    className="rounded-full"
                    style={{ aspectRatio: "64/64", objectFit: "cover" }}
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold">John Smith</div>
                    <div className="text-muted-foreground">Acme Corporation</div>
                  </div>
                  <p className="text-muted-foreground">
                    "We've been using the Exam Panel platform for our\n certification exams, and the ease of scheduling
                    and\n candidate management has been a huge time-saver for our\n team."
                  </p>
                </div>
                <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 p-4 sm:p-8">
                  <img
                    src="https://avatar.iran.liara.run/public"
                    width="64"
                    height="64"
                    alt="Avatar"
                    className="rounded-full"
                    style={{ aspectRatio: "64/64", objectFit: "cover" }}
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold">Sarah Lee</div>
                    <div className="text-muted-foreground">Edtech Solutions</div>
                  </div>
                  <p className="text-muted-foreground">
                    "The Exam Panel platform has been a game-changer for our\n online education business. The robust
                    security features\n and detailed analytics have helped us deliver a\n top-notch exam experience to
                    our students."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Exam Panel. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}