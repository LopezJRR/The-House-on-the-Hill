const storyElement = document.querySelector('#text')

const optionButtonsElement = document.querySelector('#option-buttons')

// this is where the player can collect items as they move through the game
let inventory = {}
// setInventory: {something: true} <-- will be used to add something to inventory

function startGame() {
    inventory = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {

    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

    if (textNode.background) {
        document.body.style.backgroundImage = `url(${textNode.background})`;
    } else {
        document.body.style.backgroundImage = "url('assets/old_wood.jpg')";
    }

    storyElement.innerText = textNode.story

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
    return option.requiredInventory == null || option.requiredInventory(inventory)
}

function selectOption(option) {
    const nextStoryNodeId = option.nextStory;
    if (nextStoryNodeId <= 0) {
        location.reload();
    }
    inventory = Object.assign(inventory, option.setInventory)
    showTextNode(nextStoryNodeId)
}

const textNodes = [
    {
        id: 1,
        story: 'You wake up at the top of a snowy hill surrounded by dense woods. To the north, you see a dilapidated house. To the south past the woods, you see the faint light of an old gas station above the tree tops. Where do you go?',
        background: 'assets/mountainwithsnow.jpg',
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
    // house options
    {
        id: 2,
        story: 'As you approach the house, the moonlight illuminates two items on the snow. You find an oddly shaped cross and a knife. You pick one up.',
        options: [
            {
                choice: 'You pick up the oddly shaped cross and continue to approach the house.',
                setInventory: { oddcross: true },
                nextStory: 4,
            },
            {
                choice: 'You pick up the knife and continue to approach the house.',
                setInventory: { knife: true },
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
                requiredInventory: (currentInventory) => currentInventory.oddcross,
                setInventory: { oddcross: true },
                nextStory: 6,
            },
            {
                choice: 'You try to jimmy the door with the knife.',
                requiredInventory: (currentInventory) => currentInventory.knife,
                setInventory: { knife: true },
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
        story: 'After inserting the oddly shaped cross into the keyhole, you realize that you can turn it. The oddly shaped cross was actually a key! You enter the house and see a room to the left of you and stairs in front of you. Where do you go?',
        options: [
            {
                choice: 'You decide to go into the open room to the left of you.',
                nextStory: 10,
            },
            {
                choice: 'You decide to climb the stairs.',
                nextStory: 12,
            },
        ]
    },
    {
        id: 8,
        story: 'Your jimmying of the door pays off but at a price! The door swings open but the rusted knife snaps at the applied pressure. You enter the house and see a room to the left of you and stairs in front of you. Where do you go?',
        setInventory: { knife: false },
        options: [
            {
                choice: 'You decide to go into the open room to the left of you.',
                nextStory: 10,
            },
            {
                choice: 'You decide to climb the stairs.',
                nextStory: 12,
            },
        ]
    },
    {
        id: 10,
        story: 'You enter the room to the left of you, but can\'t see. With the faint moonlight coming through the boarded up windows you manage to make out the outline of a fireplace and a stack of something. But, aside from that the room is empty. As you stand in the room, you realize how exhausted you are.',
        options: [
            {
                choice: 'You decide to take a seat and plan you\'re next move.',
                nextStory: 14,
            },
            {
                choice: 'You decide to go up the stair to see what\'s on the second floor.',
                nextStory: 12,
            },
            {
                choice: 'You light a match to get a better view of what\'s in the room. Before sitting down.',
                requiredInventory: (currentInventory) => currentInventory.matchbox,
                nextStory: 16,
            }
        ]
    },
    {
        id: 14,
        story: 'As you plan your next move, your eyes begin to feel heavy. You decide whether you should   sleep through the night and move in the sunlight or continue exploring the house.',
        options: [
            {
                choice: 'You decide to get some rest. You fall asleep on the floor.',
                nextStory: 18,
            },
            {
                choice: 'You decide to go up the staircase to see what\'s on the second floor.',
                nextStory: 12,
            },
            {
                choice: 'You bundle up tighly in the ragged coat and get some shut eye until the morning.',
                requiredInventory: (currentInventory) => currentInventory.raggedcoat,
                nextStory: 20,
            },
            {
                choice: 'You use your ragged coat as a pillow to lay on and get some shut eye until the morning.',
                requiredInventory: (currentInventory) => currentInventory.raggedcoat,
                nextStory: 18,
            }
        ]
    },
    {
        id: 16,
        story: 'With your match lighting the room, you confirm that there is a fireplace and a pile of wood and newspapers next to it. The exhaustion keeps growing as you stand there. What do you do?',
        options: [
            {
                choice: 'You decide to take a seat and plan you\'re next move.',
                nextStory: 14,
            },
            {
                choice: 'You decide to go up the staircase to see what\'s on the second floor.',
                nextStory: 12,
            },
            {
                choice: 'You use your matchbox, the newspaper, and the wood to start a fire.',
                requiredInventory: (currentInventory) => currentInventory.matchbox,
                nextStory: 22,
            },
        ]
    },
    {
        id: 22,
        story: 'With a fire going and the exhaustion setting in, you take a seat and decide to plan your next move. What do you do?',
        options: [
            {
                choice: 'You decide to go up the staircase to see what\'s on the second floor.',
                nextStory: 12,
            },
            {
                choice: 'You\'re too tired and decide to sleep through the night. You can explore when the sun is up.',
                nextStory: 24,
            },
        ]
    },
    // endings house option
    {
        id: 52,
        story: 'You rush into the door, but it\'s solid wood! Instead of the door breaking, the vibrations from the impact cause the roof above you to collapse, knocking you unconscious and burying you under a mountain of rubble.',
        background: 'assets/gameover.jpg',
        options: [
            {
                choice: 'Old house should be handled with care! Try again!',
                nextStory: -1,
            }
        ]
    },
    {
        id: 12,
        story: 'You climb up the stairs but midway up the staircase you hear the snapping of wood under you. The old, cold wood breaks under the weight of your body. You fall 25 feet straight into the basement. You fall unconscious.',
        background: 'assets/gameover.jpg',
        options: [
            {
                choice: 'Who would\'ve guessed the stairs would break? Try again!',
                nextStory: -1,
            }
        ]
    },
    {
        id: 18,
        story: 'You fall alseep but with no way of keeping warm the cold steadily dropping temperature throughout the night causes your body to slow its proceeses eventually coming to a complete stop.',
        background: 'assets/gameover.jpg',
        options: [
            {
                choice: 'Hypothermia is a silent killer! Try to find some warmth. Try again!',
                nextStory: -1,
            }
        ]
    },
    {
        id: 20,
        story: 'You wake up to the rising sun and decide to explore the outside of the house. Behind the house you find a small cabin with all of your friends in it. It seems you had too much to drink and passed out while looking for the restroom!',
        background: 'assets/person-mountain-top.jpg',
        options: [
            {
                choice: 'Congratulations! You made it through the night. Play again!',
                nextStory: -1,
            }
        ]
    },
    {
        id: 24,
        story: 'You wake up to the rising sun and decide to explore the outside of the house. Behind the house you find a small cabin with all of your friends in it. It seems you had too much to drink and passed out while looking for the restroom!',
        background: 'assets/person-mountain-top.jpg',
        options: [
            {
                choice: 'Congratulations! You made it through the night. Play again!',
                nextStory: -1,
            }
        ]
    },
    // wood options
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
                setInventory: { matchbox: true },
                nextStory: 7,
            },
            {
                choice: 'You pick up the ragged coat and put it on to keep you warm.',
                setInventory: { raggedcoat: true },
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
                requiredInventory: (currentInventory) => currentInventory.matchbox,
                nextStory: 2,
            },
            {
                choice: 'You light a match and decide to continue your adventure towards the gas station through the dark woods.',
                requiredInventory: (currentInventory) => currentInventory.matchbox,
                nextStory: 9,
            },
            {
                choice: 'With your new coat on, you decide to go towards the house.',
                requiredInventory: (currentInventory) => currentInventory.raggedcoat,
                nextStory: 2,
            },
            {
                choice: 'With your new coat on, you decide to continue your adventure towards the gas station through the woods.',
                requiredInventory: (currentInventory) => currentInventory.raggedcoat,
                nextStory: 11,
            },
        ]
    },
    // endings wood options
    {
        id: 9,
        story: 'As you explore the pitch black woods, your light attracts a terrifying bear! You have no way of defending yourself and fall victem to its deadly claws.',
        background: 'assets/gameover.jpg',
        options: [
            {
                choice: 'Do you really want to draw unknown attention? Try again!',
                nextStory: -1,
            }
        ]
    },
    {
        id: 11,
        story: 'As you explore the pitch black woods with no light, you begin to hear something running towards you. You begin to run but with no light, you fail to see the giant hole in the ground. You fall in and lose consciousness.',
        background: 'assets/gameover.jpg',
        options: [
            {
                choice: 'It\'s too dark to be running in unknown woods! Try again!',
                nextStory: -1,
            }
        ]
    },
]

startGame()

// Template for each textNode
    // {
    //     id: ,
    //     story: '',
    //     setInventory: {:},
    //     options: [
    //         {
    //             choice: '',
    //             requiredInventory: (currentInventory) => currentInventory. ,
    //             setInventory: {:},
    //             nextStory: ,
    //         },
    //         {
    //             choice: '',
    //             requiredInventory: (currentInventory) => currentInventory. ,
    //             setInventory: {:},
    //             nextStory: ,
    //         }
    //     ]
    // }