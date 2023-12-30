# distilBERT, hugging face, textblob, nltk, vader
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# polarity depends on few factors like: 
# punctuation: Ram is a good boy! < Ram is a good boy!!
#capitalization: ram is good < ram is GOOD
# degree modifier: ram is good < ram is very good
# conjuctions: ram is good > ram is good, BUT he is also naughty sometimes. 
# also understands emojies. 

def polarity_checker(sentence):
    obj = SentimentIntensityAnalyzer()
    scores = obj.polarity_scores(sentence)
    compound_score = scores['compound']
    return compound_score

if __name__ == '__main__':
    import sys
    sen = sys.argv[1]
    result = polarity_checker(sen)
    print(result)
