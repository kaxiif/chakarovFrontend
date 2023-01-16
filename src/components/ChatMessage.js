import React from 'react'
import { MdComputer, MdPersonOutline } from 'react-icons/md'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { format } from 'timeago.js'
import Image from './Image'

/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const ChatMessage = (props) => {
  const { id, createdAt, text, ai = false, selected, picUrl } = props.message
  

  return (
    <div key={id} className={`${ai && 'flex-row-reverse'} message`}>
     
          <div className='message__wrapper'>
            <ReactMarkdown className={`message__markdown ${ai ? 'text-left' : 'text-right'}`}
              children={text}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
             />
          </div>

      <div className="message__pic">
        {
          ai ? <MdComputer /> :
            <img className='cover w-10 h-10 rounded-full' loading='lazy' src={picUrl} alt='profile pic' />
        }
      </div>
    </div>
  )
}

export default ChatMessage