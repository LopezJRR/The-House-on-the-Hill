const textElement = document.querySelector('#text')

const optionButtonsElement = document.querySelector('#option-buttons')

// this is where the player can collect items as they move through the game
// setState: {something: true} <-- will be used to add something to state
let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up at the top of a snowy hill surrounded by dense woods. To the north, you see a dilapidated house with a flickering porch light. To the south past the woods, you see the faint light of an old gas station.',
        options: [
            {
                text: 'Approach the house.',
                nextText: 2
            },
            {
                text: 'Walk towards the woods.',
                nextText: 3
            },
        ]
    },
    {
        id: 2,
        text: 'As you approach the house, the flickering light illuminates two shining items on the ground. You find an oddly shaped cross and a knife. You pick one up.',
        options: [
            {
                text: 'You pick up the oddly shaped cross and continue to approach the house.',
                setState: { oddcross: true },
                nextText: 4,
            },
            {
                text: 'You pick up the knife and continue to approach the house.',
                setState: { knife: true },
                nextText: 4,
            },
        ]
    },
    {
        id: 4,
        text: 'You go up the stairs of the porch and knock on the big wooden door. No one answers. You attempt to open the door.',
        options: [
            {
                text: 'Attempt to insert the oddly shaped cross into the keyhole of door.',
                requiredState: (currentState) => currentState.oddcross,
                setState: { oddcross: true },
                nextText: 6,
            },
            {
                text: 'You try to jimmy the door with the knife.',
                requiredState: (currentState) => currentState.knife,
                setState: { knife: true },
                nextText: 6,
            },
            {
                text: 'The door looks old. You try to knock it down with brute force.',
                nextText: 6,
            },
        ]
    },
    {
        id: 3,
    },
    // {
    //     id: Death,
    //     text: 'You\'re fear is too great. You suffer sudden cardiac death.',
    //     options: [
    //         {
    //             text: 'Restart',
    //             nextText: -1,
    //         }
    //     ]
    // },
    // {
    //     id: Victory,
    //     text: 'You find the exit and escape the house!',
    //     options: [
    //         {
    //             text: 'Congratulations! Play again.',
    //             nextText: -1,
    //         }
    //     ]
    // },
]

startGame()