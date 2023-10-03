# pip install nltk 
# pip install spacy
# python -m spacy download en  / spacy package for english

# import spacy
# nlp = spacy.load("en_core_web_sm") # loads a specific package
# doc = nlp("Mr. randeep loves c++ programming language. Nidhi loves python programming language!")

# sentence tokenization in spacy. 
# for sentence in doc.sents:
#     print(sentence)

# word tokenization. 
# for s in doc.sents:
#     for w in s:
#         print(w)


# import nltk
# # nltk.download() can be used to download different corpusus, models, algos of nltk
# # but we need just punkt
# # nltk.download('punkt') one time. 
# from nltk.tokenize import sent_tokenize
# print(sent_tokenize("Mr. randeep loves c++ programming language. Nidhi loves python programming language!")
# )

# finally, we decided to use spacy. for reason, reffer docs. 