import os
import base64
import json
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email
from python_http_client.exceptions import HTTPError


def handle_message(event, context):
    json_string = base64.b64decode(event['data']).decode('utf-8')
    handle_message_json(json_string)

def handle_message_json(json_string):
    print(f"Handling message: {json_string}")
    moveMessage = json.loads(json_string)
    send_email(moveMessage)


def send_email(moveMessage):
    recipient_symbol = moveMessage["game"]["nextPlayer"]
    recipient = moveMessage["game"]["players"][recipient_symbol]
    opponent_symbol = "X" if recipient_symbol == "O" else "O"
    opponent = moveMessage["game"]["players"][opponent_symbol]
    game_id = moveMessage["game"]["id"]
    status = moveMessage["game"]["status"]
    winner = moveMessage["game"]["winner"]
    rendered_board = render_board(moveMessage["game"]["board"], moveMessage["move"]["index"])
    
    sender = os.environ["EMAIL_SENDER"]
    sg = SendGridAPIClient(os.environ['EMAIL_API_KEY'])
    base_url = os.environ["BASE_URL"]

    game_url = f"{base_url}/game/{game_id}"


    outcome_message = ""
    if status == "DRAWN":
        outcome_message = "You drew!"
    elif status == "WON":
        if recipient == winner:
            outcome_message = "You won!"
        else:
            outcome_message = "You lost!"


    html_content = f"""
<p>{opponent} has played a turn against you</p>
<pre>{rendered_board}</pre>
<p>{outcome_message}<p>
<p>View game at {game_url}</p>
    """

    message = Mail(
        to_emails=recipient,
        from_email=Email(sender, "Tic Tac Toe"),
        subject=f"New Tic Tac Toe Move - Game {game_id}",
        html_content=html_content
        )

    try:
        sg.send(message)
    except HTTPError as e:
        print(f"Error: {e}")

def render_board(board, moveIndex):
    result = " {0} | {1} | {2} \n---+---+---\n {3} | {4} | {5} \n---+---+---\n {6} | {7} | {8} "
    for i in range(9):
        symbol = board[i]
        if symbol == "-":
            symbol = " "
        if i == moveIndex:
            symbol = "<b>" + symbol + "</b>"
        result = result.replace("{" + str(i) + "}", symbol)
    return result