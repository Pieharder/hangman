import React, { Component } from 'react';
import { randomWord } from './WordList.js';
import { Button, Container } from 'react-bootstrap';
import LetterList from './LetterList.js';
import step0 from '../img/0.png';
import step1 from '../img/1.png';
import step2 from '../img/2.png';
import step3 from '../img/3.png';
import step4 from '../img/4.png';
import step5 from '../img/5.png';
import step6 from '../img/6.png';

class Hangman extends Component {

  static defaultProps = {
    maxWrongGuesses: 6,
    images: [step0, step1, step2, step3, step4, step5, step6]
  };

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord()
    }
  };

  guessedWord(){
    // display either letter if the letter was guessed, or display underscore.
    return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  handleGuess = (value) => {
    let letter = value;
    this.setState(state => ({
      guessed: state.guessed.add(letter),
      mistake: state.mistake + (state.answer.includes(letter) ? 0 : 1)
    }));
  }

  resetGame = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord()
    });
  }

  render() {
    const hangmanStyles = {
      marginTop: '2%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    }

    const gameOver = this.state.mistake >= this.props.maxWrongGuesses;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameStatus;
    if (isWinner) {
      gameStatus = "You won!"
    }
    if (gameOver) {
      gameStatus = "You lose!"
    }

    const imgStyles = {
      height: '75vh',
      width: 'auto'
    }

    const winStyles = {
      color: '#17a2b8',
      fontSize: '3em'
    }

    return (
      <React.Fragment>
        <Container style={hangmanStyles}>
          <div>
            <img style={imgStyles} src={this.props.images[this.state.mistake]} alt="current state of hangman"></img>
          </div>
          <div>
            <p>incorrect guesses: {this.state.mistake} of {this.props.maxWrongGuesses}</p>
            <p>Guess the word:</p>
            <p>
              {!gameOver ? this.guessedWord() : this.state.answer}
            </p>
            <LetterList onLetterClick={this.handleGuess} />
            <p style={winStyles}>{gameStatus}</p>
            <Button variant="outline-info" onClick={this.resetGame}>Restart game</Button>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Hangman;