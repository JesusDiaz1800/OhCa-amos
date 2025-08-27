import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  SkipForward, 
  RotateCcw, 
  Trophy, 
  Users, 
  Zap,
  Heart,
  Brain,
  Target,
  Crown,
  Star,
  X,
  Check,
  Timer,
  ArrowLeft,
  Home,
  Gamepad2,
  Sparkles,
  Flame,
  Beer,
  Wine,
  GlassWater
} from 'lucide-react'
import { 
  neverHaveIEverQuestions, 
  truthOrDareQuestions, 
  truthOrDareChallenges,
  bolivianSlang,
  bolivianDrinks,
  gameTypes
} from '../data/gameData'
import {
  wouldYouRatherQuestions,
  mostLikelyQuestions,
  tomanjiQuestions,
  tomanjiChallenges,
  preguntadosQuestions,
  queWasoBlackCards,
  queWasoWhiteCards,
  peorEsNadaWhiteCards,
  peorEsNadaRedCards,
  psychQuestions,
  trivia360Questions,
  unoQuestions,
  charadesWords,
  papiroPicoQuestions,
  chimboleo3000Questions
} from '../data/extraGameData'
import GameModeSelector from './GameModeSelector'

interface GameRound {
  id: number
  gameType: string
  title: string
  description: string
  icon: string
  color: string
  completed: boolean
  content: string
  challenge?: string
  selectedPlayers?: string[]
  isGroupGame?: boolean
  penalty?: number
  rules?: string[]
}

interface GameState {
  currentRound: number
  totalRounds: number
  rounds: GameRound[]
  isPlaying: boolean
  isModeSelection: boolean
  selectedMode: string | null
  timeLeft: number
  players: string[]
  scores: Record<string, number>
  drinks: Record<string, number>
  currentPlayer: number
  selectedPlayer: string | null
  gameHistory: string[]
  penalties: Record<string, number>
}

const GameEngine: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 1,
    totalRounds: 5,
    rounds: [],
    isPlaying: false,
    isModeSelection: true,
    selectedMode: null,
    timeLeft: 30,
    players: ['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4'],
    scores: {},
    drinks: {},
    currentPlayer: 0,
    selectedPlayer: null,
    gameHistory: [],
    penalties: {}
  })

  const availableGames = [
    {
      id: 'yo-nunca-he',
      title: 'Yo Nunca He 🤫',
      description: 'Confiesa secretos y descubre quién ha hecho qué',
      icon: '🤫',
      color: 'from-purple-500 to-pink-600',
      isGroupGame: true,
      penalty: 3,
      rules: [
        'Todos levantan 5 dedos',
        'Se lee una afirmación que empiece con "Yo nunca he..."',
        'Quienes SÍ lo han hecho, bajan un dedo y toman un trago',
        'Quien se quede sin dedos pierde y toma 3 tragos extra'
      ],
      generateContent: (players: string[]) => {
        const question = neverHaveIEverQuestions[Math.floor(Math.random() * neverHaveIEverQuestions.length)]
        return {
          type: 'yo-nunca-he',
          question: question.text,
          penalty: 3,
          rules: [
            'Todos levantan 5 dedos',
            'Quienes SÍ lo han hecho, bajan un dedo y toman un trago',
            'Quien se quede sin dedos toma 3 tragos extra'
          ]
        }
      }
    },
    {
      id: 'tomanji',
      title: 'Tomanji 🎮',
      description: 'Juego de fiesta completo con 20 modos diferentes',
      icon: '🎮',
      color: 'from-indigo-500 to-purple-600',
      isGroupGame: false,
      penalty: 4,
      rules: [
        'Elige entre 20 modos de juego',
        'Sigue las instrucciones en pantalla',
        'Si un reto incomoda, puedes saltarlo',
        'Incluye Oráculo IA y Detector de Mentiras'
      ],
      generateContent: (players: string[]) => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        const isQuestion = Math.random() > 0.5
        
        if (isQuestion) {
          const question = tomanjiQuestions[Math.floor(Math.random() * tomanjiQuestions.length)]
          return {
            type: 'tomanji',
            subType: 'question',
            question: question.text,
            targetPlayer: randomPlayer,
            penalty: 4
          }
        } else {
          const challenge = tomanjiChallenges[Math.floor(Math.random() * tomanjiChallenges.length)]
          const challengeText = challenge.text.replace('{randomPlayer}', randomPlayer)
          return {
            type: 'tomanji',
            subType: 'challenge',
            challenge: challengeText,
            targetPlayer: randomPlayer,
            penalty: 4
          }
        }
      }
    },
    {
      id: 'que-prefieres',
      title: '¿Qué Prefieres? 🤔',
      description: 'Elige entre dos opciones difíciles',
      icon: '🤔',
      color: 'from-purple-500 to-indigo-600',
      isGroupGame: true,
      penalty: 2,
      rules: [
        'Se presentan dos opciones',
        'Cada jugador elige una opción',
        'La minoría toma un trago',
        'Si hay empate, todos toman 2 tragos extra'
      ],
      generateContent: (players: string[]) => {
        const question = wouldYouRatherQuestions[Math.floor(Math.random() * wouldYouRatherQuestions.length)]
        return {
          type: 'que-prefieres',
          question: question.text,
          penalty: 2
        }
      }
    },
    {
      id: 'most-likely',
      title: '¿Quién es más probable? 🤷‍♂️',
      description: 'Vota quién es más propenso a hacer algo',
      icon: '🤷‍♂️',
      color: 'from-pink-500 to-rose-600',
      isGroupGame: true,
      penalty: 3,
      rules: [
        'Se plantea una pregunta',
        'Todos votan simultáneamente',
        'Quien reciba más votos toma',
        'Puede generar discusiones divertidas'
      ],
      generateContent: (players: string[]) => {
        const question = mostLikelyQuestions[Math.floor(Math.random() * mostLikelyQuestions.length)]
        return {
          type: 'most-likely',
          question: question.text,
          penalty: 3
        }
      }
    },
    {
      id: 'que-waso',
      title: 'Que Waso 😂',
      description: 'Juego de cartas boliviano para crear frases graciosas',
      icon: '😂',
      color: 'from-purple-500 to-indigo-600',
      isGroupGame: true,
      penalty: 2,
      rules: [
        'Cada jugador recibe 10 cartas blancas',
        'Se saca una carta negra con espacio en blanco',
        'Los jugadores completan la frase',
        'Se elige la más "wasa" (graciosa)'
      ],
      generateContent: (players: string[]) => {
        const blackCard = queWasoBlackCards[Math.floor(Math.random() * queWasoBlackCards.length)]
        const whiteCard = queWasoWhiteCards[Math.floor(Math.random() * queWasoWhiteCards.length)]
        return {
          type: 'que-waso',
          blackCard: blackCard,
          whiteCard: whiteCard,
          instruction: `Carta negra: "${blackCard}"\nCarta blanca: "${whiteCard}"\nCrea la frase más graciosa combinando ambas.`,
          penalty: 2
        }
      }
    },
    {
      id: 'peor-es-nada',
      title: 'Peor es Nada 😅',
      description: 'Crea la peor cita para un soltero',
      icon: '😅',
      color: 'from-red-500 to-pink-600',
      isGroupGame: true,
      penalty: 3,
      rules: [
        'Mínimo 3 jugadores',
        'Un jugador es el soltero',
        'Crea citas con cartas blancas y rojas',
        'El soltero elige la "peor" opción'
      ],
      generateContent: (players: string[]) => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        const whiteCard = peorEsNadaWhiteCards[Math.floor(Math.random() * peorEsNadaWhiteCards.length)]
        const redCard = peorEsNadaRedCards[Math.floor(Math.random() * peorEsNadaRedCards.length)]
        return {
          type: 'peor-es-nada',
          soltero: randomPlayer,
          whiteCard: whiteCard,
          redCard: redCard,
          instruction: `${randomPlayer} es el soltero. Crea una cita: "${whiteCard}" PERO "${redCard}". El soltero elige la peor opción.`,
          penalty: 3
        }
      }
    },
    {
      id: 'papiro-pico',
      title: 'Papiro Pico 📜',
      description: 'Juego nunca antes visto para destapar secretos íntimos',
      icon: '📜',
      color: 'from-amber-500 to-orange-600',
      isGroupGame: false,
      penalty: 5,
      rules: [
        'Juego con preguntas picantes',
        'Involucra confesión de secretos',
        'Diseño de pergamino antiguo',
        'Revelación de secretos ancestrales'
      ],
      generateContent: (players: string[]) => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        const question = papiroPicoQuestions[Math.floor(Math.random() * papiroPicoQuestions.length)]
        return {
          type: 'papiro-pico',
          question: question.text,
          targetPlayer: randomPlayer,
          penalty: 5
        }
      }
    },
    {
      id: 'chimboleo-3000',
      title: 'Chimboleo 3000 🤖',
      description: 'Juego futurista para confesiones extremas',
      icon: '🤖',
      color: 'from-cyan-500 to-blue-600',
      isGroupGame: false,
      penalty: 4,
      rules: [
        'Juego con diseño futurista',
        'Efectos visuales de escaneo',
        'Confesiones extremas',
        'Diseño neumórfico y tecnológico'
      ],
      generateContent: (players: string[]) => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        const question = chimboleo3000Questions[Math.floor(Math.random() * chimboleo3000Questions.length)]
        return {
          type: 'chimboleo-3000',
          question: question.text,
          targetPlayer: randomPlayer,
          penalty: 4
        }
      }
    },
    {
      id: 'psych',
      title: 'Psych! 🧠',
      description: 'Juego de adivinanzas absurdas sobre amigos',
      icon: '🧠',
      color: 'from-purple-500 to-pink-600',
      isGroupGame: true,
      penalty: 2,
      rules: [
        'Responde preguntas absurdas',
        'Sobre tus amigos',
        'Categorías variadas',
        'Diseño juguetón y dinámico'
      ],
      generateContent: (players: string[]) => {
        const question = psychQuestions[Math.floor(Math.random() * psychQuestions.length)]
        return {
          type: 'psych',
          question: question.text,
          penalty: 2
        }
      }
    },
    {
      id: 'trivia-360',
      title: 'TRIVIA 360 🎯',
      description: 'Juego de preguntas para estimular el cerebro',
      icon: '🎯',
      color: 'from-blue-500 to-indigo-600',
      isGroupGame: false,
      penalty: 2,
      rules: [
        'Diferentes rompecabezas de trivia',
        'Preguntas con 4 respuestas',
        'Verdadero o falso',
        'Tabla de posiciones online'
      ],
      generateContent: (players: string[]) => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        const question = trivia360Questions[Math.floor(Math.random() * trivia360Questions.length)]
        return {
          type: 'trivia-360',
          question: question.text,
          targetPlayer: randomPlayer,
          penalty: 2
        }
      }
    },
    {
      id: 'uno-game',
      title: 'UNO!™ 🃏',
      description: 'El clásico juego de cartas con nuevas reglas',
      icon: '🃏',
      color: 'from-red-500 to-yellow-500',
      isGroupGame: true,
      penalty: 3,
      rules: [
        'Sé el primero en quedarte sin cartas',
        'Combina colores o números',
        'Usa cartas especiales',
        'Incluye torneos mundiales'
      ],
      generateContent: (players: string[]) => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        const question = unoQuestions[Math.floor(Math.random() * unoQuestions.length)]
        return {
          type: 'uno-game',
          question: question.text,
          targetPlayer: randomPlayer,
          penalty: 3
        }
      }
    },
    {
      id: 'verdad-o-reto',
      title: 'Verdad o Reto 🎯',
      description: 'Elige entre revelar la verdad o completar un desafío',
      icon: '🎯',
      color: 'from-orange-500 to-red-600',
      isGroupGame: false,
      penalty: 5,
      rules: [
        'El jugador elige entre Verdad o Reto',
        'Si elige Verdad, debe responder honestamente',
        'Si elige Reto, debe completar el desafío',
        'Si se niega, toma 5 tragos de penitencia'
      ],
      generateContent: (players: string[]) => {
        const isTruth = Math.random() > 0.5
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        
        if (isTruth) {
          const question = truthOrDareQuestions[Math.floor(Math.random() * truthOrDareQuestions.length)]
          return {
            type: 'verdad-o-reto',
            subType: 'truth',
            question: question.text,
            targetPlayer: randomPlayer,
            penalty: 5
          }
        } else {
          const challenge = truthOrDareChallenges[Math.floor(Math.random() * truthOrDareChallenges.length)]
          const challengeText = challenge.text.replace('{randomPlayer}', randomPlayer)
          return {
            type: 'verdad-o-reto',
            subType: 'dare',
            challenge: challengeText,
            targetPlayer: randomPlayer,
            penalty: 5
          }
        }
      }
    },
    {
      id: 'el-rey',
      title: 'El Rey 👑',
      description: 'Juego de cartas con reglas específicas',
      icon: '👑',
      color: 'from-yellow-500 to-orange-600',
      isGroupGame: true,
      penalty: 2,
      rules: [
        'Se reparten cartas a todos los jugadores',
        'Cada carta tiene una regla específica',
        'El Rey puede hacer lo que quiera',
        'Quien tenga el As al final toma 2 tragos extra'
      ],
      generateContent: (players: string[]) => {
        const cards = ['As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        const randomCard = cards[Math.floor(Math.random() * cards.length)]
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        
        const rules = {
          'As': { action: 'Todos toman 1 trago', penalty: 2 },
          '2': { action: `${randomPlayer} toma 2 tragos`, penalty: 1 },
          '3': { action: `${randomPlayer} toma 3 tragos`, penalty: 1 },
          '4': { action: 'Todos toman 4 tragos', penalty: 1 },
          '5': { action: `${randomPlayer} toma 5 tragos`, penalty: 1 },
          '6': { action: 'Todos toman 6 tragos', penalty: 1 },
          '7': { action: `${randomPlayer} toma 7 tragos`, penalty: 1 },
          '8': { action: 'Todos toman 8 tragos', penalty: 1 },
          '9': { action: `${randomPlayer} toma 9 tragos`, penalty: 1 },
          '10': { action: 'Todos toman 10 tragos', penalty: 1 },
          'J': { action: `${randomPlayer} toma 11 tragos`, penalty: 1 },
          'Q': { action: `${randomPlayer} toma 12 tragos`, penalty: 1 },
          'K': { action: `${randomPlayer} es el Rey y puede hacer lo que quiera`, penalty: 0 }
        }
        
        const cardRule = rules[randomCard as keyof typeof rules]
        return {
          type: 'el-rey',
          card: randomCard,
          action: cardRule.action,
          penalty: cardRule.penalty
        }
      }
    },
    {
      id: 'paco',
      title: 'Paco 👮',
      description: 'Juego de adivinanzas y castigos',
      icon: '👮',
      color: 'from-blue-500 to-indigo-600',
      isGroupGame: false,
      penalty: 4,
      rules: [
        'Un jugador piensa en algo',
        'Los demás hacen preguntas de sí/no',
        'Quien adivine se convierte en el Paco',
        'Quien no adivine toma 4 tragos de penitencia'
      ],
      generateContent: (players: string[]) => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        const challenges = [
          `${randomPlayer} debe adivinar qué está pensando el grupo`,
          `${randomPlayer} debe hacer 10 flexiones`,
          `${randomPlayer} debe cantar una canción`,
          `${randomPlayer} debe bailar durante 30 segundos`,
          `${randomPlayer} debe contar un chiste`,
          `${randomPlayer} debe hacer una mueca`,
          `${randomPlayer} debe imitar a alguien del grupo`,
          `${randomPlayer} debe decir algo en otro idioma`
        ]
        return {
          type: 'paco',
          challenge: challenges[Math.floor(Math.random() * challenges.length)],
          targetPlayer: randomPlayer,
          penalty: 4
        }
      }
    },
    {
      id: 'picolo',
      title: 'Picolo ⚡',
      description: 'Juego de velocidad y reflejos',
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500',
      isGroupGame: true,
      penalty: 2,
      rules: [
        'Se dice "Picolo" y se señala a alguien',
        'Esa persona debe decir "Picolo" y señalar a otro',
        'Quien se equivoque toma un trago',
        'Quien se demore más de 3 segundos toma 2 tragos extra'
      ],
      generateContent: (players: string[]) => {
        const words = ['Picolo', 'Cañamos', 'Fiesta', 'Tragos', 'Bolivia', 'Chupar', 'Nové', 'Cumpa']
        const randomWord = words[Math.floor(Math.random() * words.length)]
        return {
          type: 'picolo',
          word: randomWord,
          instruction: `Todos deben decir "${randomWord}" y señalar a alguien. Quien se equivoque toma un trago.`,
          penalty: 2
        }
      }
    },
    {
      id: 'heads-up',
      title: 'Heads Up! 🎭',
      description: 'Mímica y adivinanzas',
      icon: '🎭',
      color: 'from-green-500 to-teal-600',
      isGroupGame: false,
      penalty: 3,
      rules: [
        'Un jugador actúa sin hablar',
        'Los demás adivinan qué está actuando',
        'Quien adivine actúa a continuación',
        'Quien no adivine en 30 segundos toma 3 tragos'
      ],
      generateContent: (players: string[]) => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        const words = ['Fútbol', 'Baile', 'Comida', 'Animal', 'Película', 'Música', 'Deporte', 'Profesión']
        const randomWord = words[Math.floor(Math.random() * words.length)]
        return {
          type: 'heads-up',
          word: randomWord,
          instruction: `${randomPlayer} debe actuar "${randomWord}" sin hablar. Los demás adivinan en 30 segundos.`,
          targetPlayer: randomPlayer,
          penalty: 3
        }
      }
    },
    {
      id: 'bomba-drink',
      title: 'Bomba Drink 💣',
      description: 'Juego de tiempo con bomba virtual',
      icon: '💣',
      color: 'from-red-600 to-pink-700',
      isGroupGame: true,
      penalty: 5,
      rules: [
        'Se activa una bomba virtual',
        'Los jugadores deben completar un desafío',
        'Quien tenga la bomba cuando explote pierde',
        'El perdedor toma 5 tragos de penitencia'
      ],
      generateContent: (players: string[]) => {
        const time = Math.floor(Math.random() * 30) + 10
        const challenges = [
          'Todos deben cantar una canción',
          'Todos deben bailar',
          'Todos deben hacer una mueca',
          'Todos deben contar hasta 10',
          'Todos deben decir su nombre al revés'
        ]
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
        return {
          type: 'bomba-drink',
          time: time,
          challenge: randomChallenge,
          instruction: `Bomba activada por ${time} segundos. ${randomChallenge}. Quien tenga la bomba cuando explote toma 5 tragos.`,
          penalty: 5
        }
      }
    },
    {
      id: 'que-prefieres',
      title: '¿Qué Prefieres? 🤔',
      description: 'Elige entre dos opciones difíciles',
      icon: '🤔',
      color: 'from-purple-500 to-indigo-600',
      isGroupGame: true,
      penalty: 2,
      rules: [
        'Se presentan dos opciones',
        'Cada jugador elige una opción',
        'La minoría toma un trago',
        'Si hay empate, todos toman 2 tragos extra'
      ],
      generateContent: (players: string[]) => {
        const options = [
          ['Ser rico pero feo', 'Ser pobre pero hermoso'],
          ['Vivir en el pasado', 'Vivir en el futuro'],
          ['Ser famoso', 'Ser feliz'],
          ['Tener mucho dinero', 'Tener mucho amor'],
          ['Ser inteligente', 'Ser atractivo'],
          ['Viajar por el mundo', 'Tener una familia'],
          ['Ser joven para siempre', 'Ser sabio'],
          ['Tener muchos amigos', 'Tener un amor verdadero']
        ]
        const randomOptions = options[Math.floor(Math.random() * options.length)]
        return {
          type: 'que-prefieres',
          options: randomOptions,
          instruction: `¿Qué prefieres: "${randomOptions[0]}" o "${randomOptions[1]}"? La minoría toma un trago. Si hay empate, todos toman 2 tragos.`,
          penalty: 2
        }
      }
    },
    {
      id: 'dados',
      title: 'Dados 🎲',
      description: 'Juegos tradicionales con dados',
      icon: '🎲',
      color: 'from-green-500 to-blue-600',
      isGroupGame: false,
      penalty: 3,
      rules: [
        'Se tiran 2 dados',
        'Cada número tiene una regla específica',
        'Quien saque dobles toma doble',
        'Quien saque 7 toma 7 tragos + 3 de penitencia'
      ],
      generateContent: (players: string[]) => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        const dice1 = Math.floor(Math.random() * 6) + 1
        const dice2 = Math.floor(Math.random() * 6) + 1
        const total = dice1 + dice2
        
        let rule = ''
        let penalty = 3
        if (total === 7) {
          rule = `${randomPlayer} toma 7 tragos + 3 de penitencia`
          penalty = 3
        } else if (dice1 === dice2) {
          rule = `${randomPlayer} toma ${total * 2} tragos (dobles)`
          penalty = 2
        } else {
          rule = `${randomPlayer} toma ${total} tragos`
          penalty = 1
        }
        
        return {
          type: 'dados',
          dice1: dice1,
          dice2: dice2,
          total: total,
          rule: rule,
          targetPlayer: randomPlayer,
          penalty: penalty
        }
      }
    },
    {
      id: 'preguntados',
      title: 'Preguntados 🧠',
      description: 'Juego de preguntas y respuestas',
      icon: '🧠',
      color: 'from-blue-500 to-purple-600',
      isGroupGame: false,
      penalty: 2,
      rules: [
        'Se hace una pregunta',
        'Quien responda mal toma un trago',
        'Quien responda bien puede hacer una pregunta',
        'Quien no responda en 10 segundos toma 2 tragos'
      ],
      generateContent: (players: string[]) => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        const questions = [
          '¿Cuál es la capital de Bolivia?',
          '¿Cuál es el color de la bandera boliviana?',
          '¿Cuál es la bebida nacional de Bolivia?',
          '¿Cuál es el plato típico de Bolivia?',
          '¿Cuál es el baile tradicional de Bolivia?',
          '¿Cuál es la montaña más alta de Bolivia?',
          '¿Cuál es el lago más alto del mundo?',
          '¿Cuál es la ciudad más alta del mundo?'
        ]
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
        return {
          type: 'preguntados',
          question: randomQuestion,
          instruction: `${randomPlayer} debe responder: "${randomQuestion}". Si falla, toma un trago. Si no responde en 10 segundos, toma 2 tragos.`,
          targetPlayer: randomPlayer,
          penalty: 2
        }
      }
    },
    {
      id: 'shot-roulette',
      title: 'Shot Roulette 🍸',
      description: 'Ruleta rusa con shots',
      icon: '🍸',
      color: 'from-red-600 to-pink-700',
      isGroupGame: false,
      penalty: 4,
      rules: [
        'Se preparan 6 shots',
        'Uno tiene algo especial',
        'Los jugadores eligen un shot',
        'Quien tome el especial toma 4 tragos extra'
      ],
      generateContent: (players: string[]) => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        const challenges = [
          `${randomPlayer} toma un shot de limón`,
          `${randomPlayer} toma un shot de sal`,
          `${randomPlayer} toma un shot de tabasco`,
          `${randomPlayer} toma un shot de vinagre`,
          `${randomPlayer} toma un shot de mostaza`,
          `${randomPlayer} toma un shot de ketchup`,
          `${randomPlayer} toma un shot de mayonesa`,
          `${randomPlayer} toma un shot de salsa picante`
        ]
        return {
          type: 'shot-roulette',
          challenge: challenges[Math.floor(Math.random() * challenges.length)],
          targetPlayer: randomPlayer,
          penalty: 4
        }
      }
    },
    {
      id: 'beer-pong',
      title: 'Beer Pong 🏓',
      description: 'Juego clásico de precisión',
      icon: '🏓',
      color: 'from-yellow-500 to-orange-600',
      isGroupGame: false,
      penalty: 3,
      rules: [
        'Se lanza una pelota a vasos',
        'Quien acierte el otro toma',
        'Quien falle toma él mismo',
        'Quien falle 3 veces seguidas toma 3 tragos extra'
      ],
      generateContent: (players: string[]) => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)]
        return {
          type: 'beer-pong',
          instruction: `${randomPlayer} debe lanzar una pelota a un vaso. Si acierta, otro toma. Si falla, toma él. Si falla 3 veces seguidas, toma 3 tragos extra.`,
          targetPlayer: randomPlayer,
          penalty: 3
        }
      }
    }
  ]

  useEffect(() => {
    if (gameState.isPlaying && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [gameState.isPlaying, gameState.timeLeft])

  const startGame = () => {
    const initialRounds = Array.from({ length: gameState.totalRounds }, (_, index) => {
      const randomGame = availableGames[Math.floor(Math.random() * availableGames.length)]
      const content = randomGame.generateContent(gameState.players)
      
      return {
        id: index + 1,
        gameType: randomGame.id,
        title: randomGame.title,
        description: randomGame.description,
        icon: randomGame.icon,
        color: randomGame.color,
        completed: false,
        content: JSON.stringify(content),
        isGroupGame: randomGame.isGroupGame,
        penalty: randomGame.penalty,
        rules: randomGame.rules,
        selectedPlayers: randomGame.isGroupGame ? gameState.players : [gameState.players[Math.floor(Math.random() * gameState.players.length)]]
      }
    })

    setGameState(prev => ({
      ...prev,
      rounds: initialRounds,
      isPlaying: true,
      isModeSelection: false,
      timeLeft: 30,
      selectedPlayer: gameState.players[Math.floor(Math.random() * gameState.players.length)]
    }))
  }

  const nextRound = () => {
    if (gameState.currentRound < gameState.totalRounds) {
      const nextRoundNumber = gameState.currentRound + 1
      const randomGame = availableGames[Math.floor(Math.random() * availableGames.length)]
      const content = randomGame.generateContent(gameState.players)
      
      const newRound: GameRound = {
        id: nextRoundNumber,
        gameType: randomGame.id,
        title: randomGame.title,
        description: randomGame.description,
        icon: randomGame.icon,
        color: randomGame.color,
        completed: false,
        content: JSON.stringify(content),
        isGroupGame: randomGame.isGroupGame,
        penalty: randomGame.penalty,
        rules: randomGame.rules,
        selectedPlayers: randomGame.isGroupGame ? gameState.players : [gameState.players[Math.floor(Math.random() * gameState.players.length)]]
      }

      setGameState(prev => ({
        ...prev,
        currentRound: nextRoundNumber,
        timeLeft: 30,
        selectedPlayer: gameState.players[Math.floor(Math.random() * gameState.players.length)],
        rounds: prev.rounds.map(round => 
          round.id === prev.currentRound 
            ? { ...round, completed: true }
            : round
        ).concat(newRound)
      }))
    } else {
      // Juego terminado
      setGameState(prev => ({ ...prev, isPlaying: false }))
    }
  }

  const addDrink = (playerName: string, amount: number = 1) => {
    setGameState(prev => ({
      ...prev,
      drinks: {
        ...prev.drinks,
        [playerName]: (prev.drinks[playerName] || 0) + amount
      }
    }))
  }

  const addPenalty = (playerName: string, amount: number) => {
    setGameState(prev => ({
      ...prev,
      penalties: {
        ...prev.penalties,
        [playerName]: (prev.penalties[playerName] || 0) + amount
      }
    }))
    addDrink(playerName, amount)
  }

  const handleGameAction = (action: 'skip' | 'complete' | 'reject') => {
    const currentRound = gameState.rounds.find(r => r.id === gameState.currentRound)
    
    if (action === 'complete') {
      if (currentRound?.isGroupGame) {
        // Juego grupal - todos toman
        gameState.players.forEach(player => addDrink(player))
      } else if (currentRound?.selectedPlayers?.[0]) {
        // Juego individual - solo el seleccionado toma
        addDrink(currentRound.selectedPlayers[0])
      }
    } else if (action === 'reject') {
      // Aplicar penitencia por rechazar
      if (currentRound?.penalty) {
        if (currentRound.isGroupGame) {
          gameState.players.forEach(player => addPenalty(player, currentRound.penalty!))
        } else if (currentRound.selectedPlayers?.[0]) {
          addPenalty(currentRound.selectedPlayers[0], currentRound.penalty!)
        }
      }
    }
    
    nextRound()
  }

  if (gameState.isModeSelection) {
    return (
      <GameModeSelector
        onModeSelect={(mode) => setGameState(prev => ({ ...prev, selectedMode: mode }))}
        onStartGame={startGame}
      />
    )
  }

  const currentRound = gameState.rounds.find(r => r.id === gameState.currentRound)
  const isGameComplete = gameState.currentRound > gameState.totalRounds

  if (isGameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-800 to-pink-600 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl"
        >
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold mb-4 text-gradient neon-text">
            ¡Juego Completado!
          </h1>
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-4">Estadísticas Finales</h2>
            <div className="space-y-4">
              {Object.entries(gameState.drinks).map(([player, drinks]) => (
                <div key={player} className="flex justify-between items-center">
                  <span className="text-lg">{player}</span>
                  <div className="text-right">
                    <span className="text-xl font-bold neon-pink">{drinks} tragos</span>
                    {gameState.penalties[player] && (
                      <div className="text-sm text-red-400">
                        +{gameState.penalties[player]} penitencias
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameState(prev => ({ ...prev, isModeSelection: true }))}
              className="btn-primary"
            >
              <Home size={20} />
              <span>Nuevo Juego</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  const currentContent = currentRound ? JSON.parse(currentRound.content) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-800 to-pink-600 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGameState(prev => ({ ...prev, isModeSelection: true }))}
          className="btn-secondary flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Salir</span>
        </motion.button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gradient neon-text">
            ¡Oh Cañamos?
          </h1>
          <p className="text-white/70">
            Ronda {gameState.currentRound} de {gameState.totalRounds}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold neon-yellow">{gameState.timeLeft}s</div>
            <div className="text-sm text-white/70">Tiempo</div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-4xl mx-auto">
        {currentRound && currentContent && (
          <motion.div
            key={currentRound.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center mb-8"
          >
            <div className="text-6xl mb-4">{currentRound.icon}</div>
            <h2 className="text-3xl font-bold mb-2 neon-text">{currentRound.title}</h2>
            <p className="text-white/80 mb-6">{currentRound.description}</p>
            
            {/* Game Rules */}
            {currentRound.rules && (
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <h3 className="text-lg font-bold mb-3 neon-cyan">📋 Reglas del Juego</h3>
                <ul className="text-sm text-white/80 space-y-1">
                  {currentRound.rules.map((rule: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-pink-400">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="bg-white/10 rounded-xl p-6 mb-6">
              <div className="text-xl font-medium mb-4">
                {currentRound.isGroupGame ? '🎉 Juego Grupal' : `👤 Jugador: ${currentRound.selectedPlayers?.[0]}`}
              </div>
              
              {/* Dynamic Content Based on Game Type */}
              <div className="text-lg text-white/90 mb-4">
                {currentContent.type === 'yo-nunca-he' && (
                  <div>
                    <p className="text-xl font-bold mb-2">"{currentContent.question}"</p>
                    <p className="text-sm text-white/70">Penitencia por perder: {currentContent.penalty} tragos</p>
                  </div>
                )}
                
                {currentContent.type === 'verdad-o-reto' && (
                  <div>
                    <p className="text-xl font-bold mb-2">
                      {currentContent.subType === 'truth' ? '🤔 VERDAD:' : '🎯 RETO:'}
                    </p>
                    <p className="text-lg mb-2">
                      {currentContent.subType === 'truth' ? currentContent.question : currentContent.challenge}
                    </p>
                    <p className="text-sm text-white/70">Penitencia por rechazar: {currentContent.penalty} tragos</p>
                  </div>
                )}
                
                {currentContent.type === 'el-rey' && (
                  <div>
                    <p className="text-2xl font-bold mb-2">🃏 Carta: {currentContent.card}</p>
                    <p className="text-lg mb-2">{currentContent.action}</p>
                    <p className="text-sm text-white/70">Penitencia: {currentContent.penalty} tragos</p>
                  </div>
                )}
                
                {currentContent.type === 'paco' && (
                  <div>
                    <p className="text-lg mb-2">{currentContent.challenge}</p>
                    <p className="text-sm text-white/70">Penitencia por fallar: {currentContent.penalty} tragos</p>
                  </div>
                )}
                
                {currentContent.type === 'picolo' && (
                  <div>
                    <p className="text-xl font-bold mb-2">⚡ {currentContent.word}</p>
                    <p className="text-lg mb-2">{currentContent.instruction}</p>
                    <p className="text-sm text-white/70">Penitencia por demora: {currentContent.penalty} tragos</p>
                  </div>
                )}
                
                {currentContent.type === 'heads-up' && (
                  <div>
                    <p className="text-xl font-bold mb-2">🎭 Actúa: {currentContent.word}</p>
                    <p className="text-lg mb-2">{currentContent.instruction}</p>
                    <p className="text-sm text-white/70">Penitencia por no adivinar: {currentContent.penalty} tragos</p>
                  </div>
                )}
                
                {currentContent.type === 'bomba-drink' && (
                  <div>
                    <p className="text-xl font-bold mb-2">💣 {currentContent.instruction}</p>
                    <p className="text-sm text-white/70">Penitencia por perder: {currentContent.penalty} tragos</p>
                  </div>
                )}
                
                {currentContent.type === 'que-prefieres' && (
                  <div>
                    <p className="text-xl font-bold mb-2">🤔 {currentContent.instruction}</p>
                    <p className="text-sm text-white/70">Penitencia por empate: {currentContent.penalty} tragos</p>
                  </div>
                )}
                
                {currentContent.type === 'dados' && (
                  <div>
                    <p className="text-2xl font-bold mb-2">🎲 Dados: {currentContent.dice1} + {currentContent.dice2} = {currentContent.total}</p>
                    <p className="text-lg mb-2">{currentContent.rule}</p>
                    <p className="text-sm text-white/70">Penitencia: {currentContent.penalty} tragos</p>
                  </div>
                )}
                
                {currentContent.type === 'preguntados' && (
                  <div>
                    <p className="text-xl font-bold mb-2">🧠 {currentContent.question}</p>
                    <p className="text-lg mb-2">{currentContent.instruction}</p>
                    <p className="text-sm text-white/70">Penitencia por no responder: {currentContent.penalty} tragos</p>
                  </div>
                )}
                
                {currentContent.type === 'shot-roulette' && (
                  <div>
                    <p className="text-xl font-bold mb-2">🍸 {currentContent.challenge}</p>
                    <p className="text-sm text-white/70">Penitencia por rechazar: {currentContent.penalty} tragos</p>
                  </div>
                )}
                
                {currentContent.type === 'beer-pong' && (
                  <div>
                    <p className="text-lg mb-2">{currentContent.instruction}</p>
                    <p className="text-sm text-white/70">Penitencia por fallar 3 veces: {currentContent.penalty} tragos</p>
                  </div>
                )}
              </div>
            </div>

            {/* Player List */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {gameState.players.map((player) => (
                <motion.div
                  key={player}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addDrink(player)}
                  className={`card cursor-pointer text-center ${
                    currentRound.selectedPlayers?.includes(player) 
                      ? 'ring-2 ring-pink-500' 
                      : ''
                  }`}
                >
                  <div className="text-2xl mb-2">👤</div>
                  <div className="font-bold mb-1">{player}</div>
                  <div className="text-sm text-white/70">
                    {gameState.drinks[player] || 0} tragos
                  </div>
                  {gameState.penalties[player] && (
                    <div className="text-xs text-red-400 mt-1">
                      +{gameState.penalties[player]} penitencias
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGameAction('reject')}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center space-x-2"
              >
                <X size={20} />
                <span>Rechazar (+{currentRound.penalty})</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGameAction('skip')}
                className="btn-secondary flex items-center space-x-2"
              >
                <SkipForward size={20} />
                <span>Saltar</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGameAction('complete')}
                className="btn-primary flex items-center space-x-2"
              >
                <Check size={20} />
                <span>Completar</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default GameEngine
