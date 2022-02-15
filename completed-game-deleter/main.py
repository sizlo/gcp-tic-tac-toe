from google.cloud import datastore

def handle_message(event, context):
    print("Deleting all completed games")
    
    datastore_client = datastore.Client()
    delete_all_games_with_status(datastore_client, "WON")
    delete_all_games_with_status(datastore_client, "DRAWN")

def delete_all_games_with_status(client, status):
    query = client.query(kind="Game")
    query.add_filter("status", "=", status)
    query.keys_only()
    games_to_delete = list(query.fetch())
    keys_to_delete = [game.key for game in games_to_delete]
    client.delete_multi(keys_to_delete)
