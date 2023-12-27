import { Section } from './Section'
import { useSetAtom } from 'jotai'
import { isTalkingAtom } from '@/atoms/audio.js'

const FRONT_SKILLS = [
  {
    title: (
      <>
        Javascript <span className="hidden md:flex">&nbsp;(ES6 and above)</span>
      </>
    ),
    titleSpoken: '<speak>Javascript</speak>',
    level: 90
  },
  {
    title: 'Typescript',
    titleSpoken: '<speak>Typescript</speak>',
    level: 90
  },
  {
    title: 'React.js',
    titleSpoken: '<speak>React.js</speak>',
    level: 90
  },
  {
    title: 'React Native',
    titleSpoken: '<speak>React Native</speak>',
    level: 90
  },
  {
    title: 'Vue.js',
    titleSpoken: '<speak>View J S <break time="0.2s"/>, 2 , 3 , view x and penia</speak>',
    level: 90
  },
  {
    title: (
      <>
        Redux<span className="hidden md:flex">&nbsp;(Toolkit, Saga)</span>
      </>
    ),
    level: 90
  },
  { title: 'ReactQuery', level: 75 },
  {
    title: (
      <>
        Test<span className="hidden md:flex">&nbsp;(unit, behavior, e2e)</span>
      </>
    ),
    level: 90
  },
  {
    title: (
      <>
        Next.js<span className="hidden md:flex">&nbsp;(13 and above)</span>
      </>
    ),
    level: 85
  },
  { title: 'Rest, gRPC, graphQL', level: 90 },
  {
    title: (
      <>
        Socket<span className="hidden md:flex">&nbsp;(io, WS)</span>
      </>
    ),
    level: 85
  },
  {
    title: (
      <>
        PWA<span className="hidden md:flex">&nbsp;(workbox)</span>
      </>
    ),
    level: 90
  },
  {
    title: 'Three.js',
    level: 40
  }
]
const BACK_SKILLS = [
  { title: 'Docker', level: 90 },
  {
    title: 'Terraform',
    titleSpoken:
      '<speak>Terraform <break time="0.2s"/> used Terraform to manage A W S and google cloud infrastructure</speak>',
    level: 70
  },
  {
    title: (
      <>
        CI/CD<span className="hidden md:flex">&nbsp;(GitHub, GitLab, bitbucket, jenkins)</span>
      </>
    ),
    titleSpoken:
      '<speak>CI/CD <break time="0.2s"/> including GitHub, GitLab, bitbucket and jenkins</speak>',
    level: 70
  },
  {
    title: (
      <>
        Cloud<span className="hidden md:flex">&nbsp;(AWS, GCP)</span>
      </>
    ),
    titleSpoken: '<speak>Cloud <break time="0.2s"/> including A W S and Google Cloud</speak>',
    level: 70
  },
  { title: 'Kubernetes', level: 65 },
  { title: 'Helm', level: 65 },
  {
    title: (
      <>
        Nodejs<span className="hidden md:flex">&nbsp;(sails, express, nest)</span>
      </>
    ),
    titleSpoken: '<speak>Node J S <break time="0.2s"/>sails J S, express J S and nest J S</speak>',
    level: 90
  },
  {
    title: (
      <>
        DB<span className="hidden md:flex">&nbsp;(MySQL, MongoDB, Postgres)</span>
      </>
    ),
    titleSpoken: '<speak>DB <break time="0.2s"/> My S Q L, Mongo DB and Post gres</speak>',
    level: 65
  },
  {
    title: (
      <>
        Python<span className="hidden md:flex">&nbsp;(fastAPI, django)</span>
      </>
    ),
    titleSpoken:
      '<speak>Python (fast<say-as interpret-as="characters">api</say-as>, django)</speak>',
    level: 65
  },
  {
    title: (
      <>
        PHP<span className="hidden md:flex">&nbsp;(laravel, zf2)</span>
      </>
    ),
    level: 70
  },
  {
    title: (
      <>
        Ruby<span className="hidden md:flex">&nbsp;(Rails)</span>
      </>
    ),
    level: 65
  },
  {
    title: (
      <>
        Node.js<span className="hidden md:flex">&nbsp;(express, nest)</span>
      </>
    ),
    level: 90
  }
]
const MANAGEMENT_SKILLS = [
  {
    title: 'Scrum Player',
    titleSpoken: '<speak>Scrum Player</speak>',
    level: 90
  },
  { title: 'Agile Team Lead Certified', level: 90 },
  {
    title: 'iSAQB Certified SoftwareArchitect',
    titleSpoken:
      '<speak><say-as interpret-as="characters">isaqb</say-as> Certified SoftwareArchitect</speak>',
    level: 90
  }
]

export const SkillsSection = () => {
  return (
    <Section key="skills">
      <div className="px-2 py-4 -mt-24 rounded-3xl shadow-primary text-lg text-white w-4/5 lg:w-1/2">
        <div>
          <h3 className="text-3xl lg:text-5xl font-bold text-gray-900 pb-3 lg:pb-6 ">Skills</h3>
          <div className="mt-2 space-y-1 lg:space-y-4 lg:mt-4">
            {FRONT_SKILLS.map((skill, index) => (
              <Badge
                key={index}
                title={skill.title}
                level={skill.level}
                titleSpoken={skill.titleSpoken}
              />
            ))}
          </div>
          <div className="mt-2 space-y-1 lg:space-y-4 lg:mt-4">
            {BACK_SKILLS.map((skill, index) => (
              <Badge
                key={index}
                title={skill.title}
                level={skill.level}
                titleSpoken={skill.titleSpoken}
              />
            ))}
          </div>
          <div className="mt-2 space-y-1 lg:space-y-4 lg:mt-4">
            {MANAGEMENT_SKILLS.map((skill, index) => (
              <Badge
                key={index}
                title={skill.title}
                level={skill.level}
                titleSpoken={skill.titleSpoken}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="blur-2xl absolute -mt-48 z-[-1] rotate-12">
        <svg
          id="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="300"
          height="300">
          <path
            d="M3 30 A3 3 0 0 1 0.4 25.5 L13.4 2.5 A3 3 0 0 1 18.6 2.5 L31.6 25.5 A3 3 0 0 1 29 30 Z"
            fill="#b1a5ff"
          />
        </svg>
      </div>
      <div className="blur-md absolute right-0 -mt-96 z-[-1] -rotate-12 opacity-60">
        <svg
          id="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="200"
          height="200">
          <path
            d="M3 30 A3 3 0 0 1 0.4 25.5 L13.4 2.5 A3 3 0 0 1 18.6 2.5 L31.6 25.5 A3 3 0 0 1 29 30 Z"
            fill="#EF9A9A"
          />
        </svg>
      </div>
      <div className="blur-xl absolute right-48 mt-96 z-[-1] -rotate-12 opacity-60">
        <svg
          id="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="200"
          height="200">
          <circle cx="16" cy="16" r="16" fill="#9aefa4" />
        </svg>
      </div>
    </Section>
  )
}

const Badge = ({ titleSpoken, title, level }) => {
  const setIsTalking = useSetAtom(isTalkingAtom)

  const handleTextToSpeech = () => {
    const utterThis = new SpeechSynthesisUtterance()
    utterThis.text = titleSpoken || title
    window.speechSynthesis.speak(utterThis)

    const synth = window.speechSynthesis
    utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror')
    }
    utterThis.onstart = function (event) {
      setIsTalking(true)
    }
    utterThis.onend = function (event) {
      setIsTalking(false)
    }
    utterThis.onpause = function (event) {
      setIsTalking(false)
    }
    utterThis.onresume = function (event) {
      setIsTalking(true)
    }
  }

  return (
    <div
      role="button"
      onClick={handleTextToSpeech}
      onMouseEnter={handleTextToSpeech}
      onMouseLeave={() => {
        setIsTalking(false)
        window.speechSynthesis.cancel()
      }}
      title={`${level}%`}
      className="bg-secondary inter cursor-pointer text-white text-[10px] lg:text-sm font-medium mr-2 px-2 py-0 lg:px-3 lg:py-1 rounded-lg inline-flex items-center truncate">
      {title}
    </div>
  )
}
