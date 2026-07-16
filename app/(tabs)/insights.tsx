/*import { styled } from "nativewind";
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

const insights = () => {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text>insights</Text>
    </SafeAreaView>
  )
}

export default insights*/

import React, { useState } from 'react'
import { Button, FlatList, ListRenderItem, StyleSheet, Text, TextInput, View } from 'react-native'

const insights = () => {
  const [journalText, setJournalText] = useState('')

  type Entry = { id: string; date: string; content: string }

  // Mock data for demonstration
  const MOCK_ENTRIES: Entry[] = [
    { id: '1', date: 'Today', content: 'Had a productive day working on the journal feature.' },
    { id: '2', date: 'Yesterday', content: 'Learned about React Native state management.' },
    { id: '3', date: '2 days ago', content: 'Planned the new features for the app.' }
  ]

  const handleAddEntry = () => {
    if (journalText.trim()) {
      alert('Journal entry saved! (Not actually persisted in this demo)')
      setJournalText('')
    } else {
      alert('Please write something before saving')
    }
  }

  const renderItem: ListRenderItem<Entry> = ({ item }) => (
    <View style={styles.entryCard}>
      <Text style={styles.entryDate}>{item.date}</Text>
      <Text style={styles.entryContent}>{item.content}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Journal</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, { maxHeight: 100 }]}
          placeholder="What's on your mind today..."
          value={journalText}
          onChangeText={setJournalText}
          multiline
        />
        <View style={styles.buttonContainer}>
          <Button title="Add Entry" onPress={handleAddEntry} />
        </View>
      </View>

      <View style={styles.entriesContainer}>
        <Text style={styles.entriesTitle}>Recent Entries</Text>
        <FlatList
          data={MOCK_ENTRIES}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    marginBottom: 24
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a'
  },
  inputContainer: {
    marginBottom: 24
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  buttonContainer: {
    marginTop: 12
  },
  entriesContainer: {
    flex: 1
  },
  entriesTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1a1a1a'
  },
  listContentContainer: {
    paddingBottom: 20
  },
  entryCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4f46e5'
  },
  entryDate: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4
  },
  entryContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 22
  }
})

export default insights