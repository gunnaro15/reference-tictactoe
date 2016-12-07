## Test Examples

**1. Create game command**

Given []  
When [CreateGame]  
Then [GameCreated]

**2. Join game command**

Given [GameCreated]  
When [JoinGame]  
Then [GameJoined]

Given [GameCreated, GameJoined]  
When [JoinGame]  
Then [FullGameJoinAttempted]

**3. Place move command**

Given [GameCreated, GameJoined]  
When [PlaceMove(0,0,X)]  
Then [MovePlaced(0,0,X)]

Given [MovePlaced(0,0,X)]  
When [PlaceMove(0,0,O)]  
Then [IllegalMove]

Given [MovePlaced(0,0,X)]  
When [PlaceMove(1,0,X)]  
Then [NotYourMove]

Given [MovePlaced(0,0,X), MovePlaced(1,0,X)]  
When [PlaceMove(2,0,X)]  
Then [MovePlaced(2,0,X), GameWon(X)]

Given [MovePlaced(0,0,O), MovePlaced(0,1,O)]  
When [PlaceMove(0,2,O)]  
Then [MovePlaced(0,2,O), GameWon(O)]

Given [MovePlaced(0,0,X), MovePlaced(1,1,X)]  
When [PlaceMove(2,2,X)]  
Then [MovePlaced(2,2,X), GameWon(X)]

Given [MovePlaced(0,2,O), MovePlaced(1,1,O)]  
When [PlaceMove(2,0,O)]  
Then [MovePlaced(2,0,O), GameWon(O)]

Given [GameWon(X)]  
When [PlaceMove(0,0,O)]  
Then [GameIsOver]

Given [8 MovePlaced]  
When [PlaceMove]  
Then [MovePlaced, Draw]
