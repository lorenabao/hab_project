import React from 'react'
import './QuestionPreview.css'
import { Link, NavLink } from 'react-router-dom';



function QuestionPreview({ question }) {
    
    let tags = []
    
    // Generar array de tags para recorrerlo
    if(question.tags) {
        tags = question.tags.split(',')
    }

    return (
    
        <div className='question-preview-summary'>

            {/* Sidebar de estadísticas */}
            <aside className='question-preview-stats'>
                <div className='question-preview-votes'>
                    <span className='counter'>
                        {question.views || 0}
                    </span>
                    <span>
                        views
                    </span>
                </div>
                <div className='question-preview-answers-count'>
                    <span className='counter'>
                        {question.answers.length}
                    </span>
                    <span>
                        answers
                    </span>
                </div>
            </aside>

            {/* Extracto de la pregunta */}
            <main className='question-preview'>
                <h3>
                    <NavLink to={`/question/${question.id}`} className="question-preview-title"> {question.title} </NavLink>
                </h3>
                {question.languages && 
                        question.languages.map(language => 
                            <Link to={'/questions?languages=' + language} className="question-preview-languages"> {language} </Link>
                        )
                    } 
                <div className='question-preview-excerpt'>
                    <div dangerouslySetInnerHTML={{__html: question.body.substring(0, 250) + ' ...'}} className="answer body"></div>
                </div>
                <div className='question-preview-tags'>
                    {tags.length >= 1 && 
                        tags.map((tag, i) => 
                            <Link to={'/questions?tags=' + tag} key={i}>
                                {tag}
                            </Link>

                    )}
                </div>
            </main>

        </div>
    )
}

export default QuestionPreview