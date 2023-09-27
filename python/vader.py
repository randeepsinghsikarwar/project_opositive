from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

obj = SentimentIntensityAnalyzer()

sentence = ""
sentiment_dict = obj.polarity_scores(sentence)
print(sentiment_dict)

# CAPS and ! increases the intensity of sentence and hence increare value of compound score/=/*