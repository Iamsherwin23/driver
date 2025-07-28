import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or replace with any icon library
import { Constants } from '../constants/constants';

const CustomMessageModal = ({ visible, onClose, message = 'Success!', response }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {response == 200 ?
            <Ionicons name="checkmark-circle" size={50} color={Constants.COLORS.GREEN} />:
            <Ionicons name="close-circle-outline" size={50} color={Constants.COLORS.RED} />
          }
          <Text style={[styles.header, response == 200 ? {color: Constants.COLORS.GREEN} : {color: Constants.COLORS.RED}]}>{response == 200 ? "Success" : "Error"}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose} 
            activeOpacity={0.5} 
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Constants.COLORS.RED_TINT,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    fontSize: 17,
    fontWeight: 600
  },
  message: {
    marginTop: 15,
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: Constants.COLORS.GRAY,
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  closeText: {
    color: 'white',
    fontSize: 13,
  },
});

export default CustomMessageModal;
