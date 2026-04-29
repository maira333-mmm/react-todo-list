import { useState, useEffect, useRef } from "react";
import styles from "./VoiceInput.module.css";

const VoiceInput = ({ onAddTask }) => {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(true);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupported(false);
    }
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch(e) {}
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakText = (text) => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const parseCommand = (text) => {
    console.log("Full command:", text);
    const lowerText = text.toLowerCase();
    
    let title = "";
    let description = "";
    let priority = "Medium";
    let dueDate = "";
    let tags = [];
    
    // Extract title (everything from start until "description" or "priority" or "date" or "tags" or "save")
    let remainingText = text;
    
    // Check for "title" keyword
    if (lowerText.includes("title")) {
      const titleMatch = text.match(/title\s+(.+?)(?=\s+description\s+|\s+priority\s+|\s+date\s+|\s+tags\s+|\s+save\s+|$)/i);
      if (titleMatch) {
        title = titleMatch[1].trim();
        remainingText = remainingText.replace(titleMatch[0], '');
      } else {
        // If "title" word is there but no clear boundary
        const afterTitle = text.split(/title\s+/i)[1];
        if (afterTitle) {
          title = afterTitle.split(/\s+(?:description|priority|date|tags|save)\s+/i)[0].trim();
        }
      }
    }
    
    // If no title found with keyword, take first few words until next keyword
    if (!title) {
      const firstWords = text.split(/\s+(?:description|priority|date|tags|save)\s+/i)[0];
      if (firstWords && !firstWords.toLowerCase().includes('description')) {
        title = firstWords.trim();
      }
    }
    
    // Extract description
    if (lowerText.includes("description")) {
      const descMatch = text.match(/description\s+(.+?)(?=\s+priority\s+|\s+date\s+|\s+tags\s+|\s+save\s+|$)/i);
      if (descMatch) {
        description = descMatch[1].trim();
      } else {
        const afterDesc = text.split(/description\s+/i)[1];
        if (afterDesc) {
          description = afterDesc.split(/\s+(?:priority|date|tags|save)\s+/i)[0].trim();
        }
      }
    }
    
    // Extract priority
    if (lowerText.includes("priority")) {
      if (lowerText.includes("high")) {
        priority = "High";
      } else if (lowerText.includes("low")) {
        priority = "Low";
      } else if (lowerText.includes("medium")) {
        priority = "Medium";
      }
      
      // Also try to extract custom priority word
      const priorityMatch = text.match(/priority\s+(high|medium|low|urgent|important)/i);
      if (priorityMatch) {
        const p = priorityMatch[1].toLowerCase();
        if (p === 'high' || p === 'urgent' || p === 'important') priority = "High";
        else if (p === 'low') priority = "Low";
        else if (p === 'medium') priority = "Medium";
      }
    }
    
    // Extract date
    if (lowerText.includes("date")) {
      const dateMatch = text.match(/date\s+(.+?)(?=\s+tags\s+|\s+save\s+|$)/i);
      if (dateMatch) {
        dueDate = parseDate(dateMatch[1].trim());
      } else {
        const afterDate = text.split(/date\s+/i)[1];
        if (afterDate) {
          dueDate = parseDate(afterDate.split(/\s+(?:tags|save)\s+/i)[0].trim());
        }
      }
    }
    
    // Extract tags (NEW!)
    if (lowerText.includes("tags") || lowerText.includes("tag")) {
      const tagsMatch = text.match(/tags?\s+(.+?)(?=\s+save\s+|$)/i);
      if (tagsMatch) {
        const tagsStr = tagsMatch[1].trim();
        // Split tags by comma, space, or both
        tags = tagsStr.split(/[,\s]+/).filter(tag => tag.length > 0);
      } else {
        const afterTags = text.split(/tags?\s+/i)[1];
        if (afterTags) {
          const tagsStr = afterTags.split(/\s+save\s+/i)[0].trim();
          tags = tagsStr.split(/[,\s]+/).filter(tag => tag.length > 0);
        }
      }
    }
    
    // Also check for standalone date without "date" keyword
    if (!dueDate) {
      const standaloneDate = parseDate(text);
      if (standaloneDate) dueDate = standaloneDate;
    }
    
    // Clean up title - remove any leftover keywords
    title = title.replace(/description|priority|date|tags?|save/gi, '').trim();
    
    // Capitalize title
    if (title) {
      title = title.charAt(0).toUpperCase() + title.slice(1);
    }
    
    // Clean tags: remove special chars and lowercase
    tags = tags.map(tag => tag.toLowerCase().replace(/[^a-z0-9]/g, '')).filter(tag => tag.length > 0);
    
    return { title, description, priority, dueDate, tags };
  };

  const parseDate = (dateStr) => {
    const lower = dateStr.toLowerCase().trim();
    
    // Tomorrow
    if (lower.includes('tomorrow')) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    }
    
    // Next week
    if (lower.includes('next week')) {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return d.toISOString().split('T')[0];
    }
    
    // Day names
    const days = { monday:1, tuesday:2, wednesday:3, thursday:4, friday:5, saturday:6, sunday:0 };
    for (const [day, num] of Object.entries(days)) {
      if (lower.includes(day)) {
        const today = new Date();
        const currentDay = today.getDay();
        let daysUntil = num - currentDay;
        if (daysUntil <= 0) daysUntil += 7;
        const d = new Date(today);
        d.setDate(today.getDate() + daysUntil);
        return d.toISOString().split('T')[0];
      }
    }
    
    // Month Year: August 2026
    const monthYearMatch = dateStr.match(/(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{4})/i);
    if (monthYearMatch) {
      const d = new Date(`${monthYearMatch[1]} 15, ${monthYearMatch[2]}`);
      if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
    }
    
    // Day Month Year: 15 August 2026
    const fullMatch = dateStr.match(/(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{4})/i);
    if (fullMatch) {
      const d = new Date(`${fullMatch[2]} ${fullMatch[1]}, ${fullMatch[3]}`);
      if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
    }
    
    // Just year: 2026
    const yearMatch = dateStr.match(/\b(202[5-9]|2030)\b/);
    if (yearMatch) {
      return `${yearMatch[1]}-12-31`;
    }
    
    return '';
  };

  const startListening = () => {
    if (!supported) {
      alert("Speech recognition not supported. Please use Chrome or Edge.");
      return;
    }

    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        console.log("User said:", spokenText);
        
        // Check for save command
        if (spokenText.toLowerCase().includes('save')) {
          const parsed = parseCommand(spokenText);
          console.log("Parsed:", parsed);
          
          if (parsed.title) {
            const taskData = {
              title: parsed.title,
              description: parsed.description || "",
              priority: parsed.priority,
              dueDate: parsed.dueDate || "",
              tags: parsed.tags && parsed.tags.length > 0 ? parsed.tags : ["voice"]
            };
            
            onAddTask(taskData);
            
            // Voice feedback
            let feedback = `Task saved. Title: ${taskData.title}. `;
            if (taskData.description) feedback += `Description: ${taskData.description}. `;
            feedback += `Priority: ${taskData.priority}. `;
            if (taskData.dueDate) {
              const formatted = new Date(taskData.dueDate).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
              feedback += `Due date: ${formatted}. `;
            }
            if (taskData.tags && taskData.tags.length > 0) {
              feedback += `Tags: ${taskData.tags.join(", ")}. `;
            }
            feedback += `Task added successfully.`;
            
            speakText(feedback);
          } else {
            speakText("No title found. Please say title first.");
          }
        } else {
          speakText("Please say your command with save at the end. For example: Title task management system description full stack development priority high date August 2027 tags work,urgent save");
        }
        
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          speakText("Please allow microphone access.");
        } else {
          speakText("Something went wrong. Please try again.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error("Error:", error);
      setIsListening(false);
    }
  };

  if (!supported) {
    return (
      <button className={styles.voiceBtn} disabled title="Voice not supported">
        🎤
      </button>
    );
  }

  return (
    <div className={styles.voiceContainer}>
      <button 
        className={`${styles.voiceBtn} ${isListening ? styles.listening : ''}`}
        onClick={startListening}
        title="Click and speak to add task"
      >
        {isListening ? '🎙️' : '🎤'}
      </button>
      {isListening && (
        <div className={styles.listeningOverlay}>
          <div className={styles.ripple}></div>
          <div className={styles.ripple}></div>
          <div className={styles.ripple}></div>
          <div style={{ textAlign: 'center', maxWidth: '85%', zIndex: 1 }}>
            <span style={{ fontSize: '1.8rem' }}>🎤 Listening...</span>
            
            <div style={{ marginTop: '30px', background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '15px' }}>
              <div style={{ color: '#00d4ff', marginBottom: '15px' }}>📋 Example:</div>
              <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                "Title task management system description full stack development priority high date August 2027 tags work,urgent,project save"
              </div>
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <small style={{ fontSize: '12px', opacity: 0.7 }}>
                💡 Say: title [your title] description [your description] priority [high/medium/low] date [date] tags [tag1,tag2,tag3] save
              </small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;