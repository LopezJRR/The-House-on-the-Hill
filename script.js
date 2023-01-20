const textElement = document.querySelector('#text')

const optionButtonsElement = document.querySelector('#option-buttons')

// this is where the player can collect items as they move through the game
let state = {}
// setState: {something: true} <-- will be used to add something to state

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.story
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.choice
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
    const nextTextNodeId = option.nextStory
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        story: 'You wake up at the top of a snowy hill surrounded by dense woods. To the north, you see a dilapidated house with a flickering porch light. To the south past the woods, you see the faint light of an old gas station above the tree tops. Where do you go?',
        options: [
            {
                choice: 'Approach the house.',
                nextStory: 2
            },
            {
                choice: 'Walk towards the woods.',
                nextStory: 3
            },
        ]
    },
    {
        id: 2,
        story: 'As you approach the house, the flickering light illuminates two shining items on the ground. You find an oddly shaped cross and a knife. You pick one up.',
        options: [
            {
                choice: 'You pick up the oddly shaped cross and continue to approach the house.',
                setState: { oddcross: true },
                nextStory: 4,
            },
            {
                choice: 'You pick up the knife and continue to approach the house.',
                setState: { knife: true },
                nextStory: 4,
            },
        ]
    },
    {
        id: 4,
        story: 'You go up the stairs of the porch and knock on the big wooden door. No one answers. You attempt to open the door.',
        options: [
            {
                choice: 'Attempt to insert the oddly shaped cross into the keyhole of door.',
                requiredState: (currentState) => currentState.oddcross,
                setState: { oddcross: true },
                nextStory: 6,
            },
            {
                choice: 'You try to jimmy the door with the knife.',
                requiredState: (currentState) => currentState.knife,
                setState: { knife: true },
                nextStory: 8,
            },
            {
                choice: 'The door looks old. You try to knock it down with brute force.',
                nextStory: 52,
            },
        ]
    },
    {
        id: 6,
        story: 'After inserting the oddly shaped cross into the keyhole, you realize that you can turn it. The oddly shaped cross was actually a key! You enter the home.',
        options: [
            {
                choice: 'Attempt to insert the oddly shaped cross into the keyhole of door.',
                nextStory: 10,
            },
            {
                choice: 'You try to jimmy the door with the knife.',
                nextStory: 12,
            },
        ]
    },
    {
        id: 8,
        story: 'Your jimmying of the door pays off but at a price! The door swings open but the rusted knife snaps at the applied pressure. You enter the home.',
        options: [
            {
                choice: 'Attempt to insert the oddly shaped cross into the keyhole of door.',
                nextStory: 10,
            },
            {
                choice: 'You try to jimmy the door with the knife.',
                nextStory: 12,
            },
        ]
    },
    {
        id: 52,
        story: 'You rush into the door, but it\'s solid wood! Instead of the door breaking, the vibrations from the impact cause the roof above you to collapse, knocking you unconscious and burying you under a mountain of rubble.',
        options: [
            {
                choice: 'Old house should be handled with care! Try again!',
                nextText: 0,
            }
        ]
    },
    {
        id: 3,
        story: 'As you walk towards the pitch black woods, you hear the crunching of leaves and branches. You decide between continuing forward or turning back towards the house.',
        options: [
            {
                choice: 'You turn back and walk towards the house.',
                nextStory: 2,
            },
            {
                choice: 'You continue towards the gas station and into the woods.',
                nextStory: 5,
            },
        ]
    },
    {
        id: 5,
        story: 'As you continue towards the woods, the moonlight illuminates two items on the ground. You find a box of matches and a ragged coat. You pick one up.',
        options: [
            {
                choice: 'You pick up the box of matches to use as a light source.',
                setState: { matchbox: true },
                nextStory: 7,
            },
            {
                choice: 'You pick up the ragged coat and put it on to keep you warm.',
                setState: { raggedcoat: true },
                nextStory: 7,
            },
        ]
    },
    {
        id: 7,
        story: 'With your new found item, you continue to advance towards the woods. As you enter the woods, you hear something running through the snow. You debate between continuing forward or turning around once more.',
        options: [
            {
                choice: 'You take your match box and decide to go towards the house.',
                requiredState: (currentState) => currentState.matchbox,
                nextStory: 2,
            },
            {
                choice: 'You light a match and decide to continue your adventure towards the gas station through the dark woods.',
                requiredState: (currentState) => currentState.matchbox,
                nextStory: 9,
            },
            {
                choice: 'With your new coat on, you decide to go towards the house.',
                requiredState: (currentState) => currentState.raggedcoat,
                nextStory: 2,
            },
            {
                choice: 'With your new coat on, you decide to continue your adventure towards the gas station through the woods.',
                requiredState: (currentState) => currentState.raggedcoat,
                nextStory: 11,
            },
        ]
    },
    {
        id: 9,
        story: 'As you explore the pitch black woods, your light attracts a terrifying monster! You have no way of defending yourself and fall victem to its deadly claws.',
        options: [
            {
                choice: 'Do you really want to draw unknown attention? Try again!',
                nextText: 0,
            }
        ]
    },
    {
        id: 11,
        story: 'As you explore the pitch black woods with no light, you begin to hear something running towards you. You begin to run but with no light, you fail to see the giant hole in the ground. You fall in and lose consciousness.',
        options: [
            {
                choice: 'It\'s too dark to be running in unknown woods! Try again!',
                nextText: 0,
            }
        ]
    },
    // {
    //     id: Victory,
    //     story: 'You find the exit and escape the house!',
    //     options: [
    //         {
    //             choice: 'Congratulations! Play again.',
    //             nextText: -1,
    //         }
    //     ]
    // },
]

startGame()